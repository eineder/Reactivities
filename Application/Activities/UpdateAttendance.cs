using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;

            public Handler(IUserAccessor userAccessor, DataContext context)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(a => a.AppUser)
                    .FirstOrDefaultAsync(a => a.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = activity.Attendees
                    .FirstOrDefault(a => a.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null)
                {
                    if (attendance.AppUser.UserName == hostUsername)
                        activity.IsCancelled = !activity.IsCancelled;
                    else
                        activity.Attendees.Remove(attendance);
                }
                else
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var success = await _context.SaveChangesAsync() > 0;

                return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}