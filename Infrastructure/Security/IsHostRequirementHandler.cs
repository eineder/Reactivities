using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;

        }
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context,
             IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return;

            var activityGuidString = _httpContextAccessor.HttpContext?.Request.RouteValues.FirstOrDefault(x => x.Key == "id").Value?.ToString();

            if (activityGuidString == null) return;

            if (!Guid.TryParse(activityGuidString, out var activityGuid)) return;

            var attendee = _dbContext
                .ActivityAttendees
                .AsNoTracking()
                .FirstOrDefault(x => x.AppUserId == userId && x.ActivityId == activityGuid);

            if (attendee == null) return;

            if (attendee.IsHost) context.Succeed(requirement);
        }
    }
}