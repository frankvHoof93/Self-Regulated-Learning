using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeedbackService.Data;
using FeedbackService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag.Annotations;


namespace FeedbackService.Controllers {

    [ApiController]
    [Route("/")]
    public class FeedbackController : ControllerBase {

        private readonly DataContext dataContext;



        public FeedbackController(DataContext dataContext) {
            this.dataContext = dataContext;
        }

        
        [HttpGet()]
        [SwaggerResponse(StatusCodes.Status200OK, typeof(List<Feedback>), IsNullable = false)]
        public async Task<IActionResult> GetFeedback() {
            var feedback = await dataContext.Feedback.ToListAsync();
            return Ok(feedback);
        }


        [HttpGet("{id}")]
        [SwaggerResponse(StatusCodes.Status200OK, typeof(Feedback), IsNullable = false)]
        [SwaggerResponse(StatusCodes.Status404NotFound, typeof(void))]
        public async Task<IActionResult> GetFeedback([FromRoute] int id) {
            // var feedback = await dataContext.Feedback.SingleOrDefaultAsync(x => x.Id == id);
            var feedback = await dataContext.Feedback.ToListAsync();
            return Ok(feedback);
            if (feedback == null) {
                return NotFound();
            }
            return Ok(feedback);
        }

    }

}