using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{

    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if (activity == null)
                    throw new InvalidOperationException("Could not find activity");

                activity.Title = request.Activity.Title;
                activity.Category = request.Activity.Category;
                activity.City = request.Activity.City;
                activity.Date = request.Activity.Date;
                activity.Description = request.Activity.Description;
                activity.Venue = request.Activity.Venue;

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                    return Unit.Value;
                else
                    throw new Exception("Could not save new entity.");

            }

        }
    }

}