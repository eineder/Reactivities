using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{

    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null) return null;

                activity.Title = request.Activity.Title;
                activity.Category = request.Activity.Category;
                activity.City = request.Activity.City;
                activity.Date = request.Activity.Date;
                activity.Description = request.Activity.Description;
                activity.Venue = request.Activity.Venue;

                var success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Failed to update activity.");

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }

}