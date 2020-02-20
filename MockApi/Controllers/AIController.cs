using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

using ASP_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ASP_API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AIController : ControllerBase
    {
        [HttpPost]
        public IActionResult UploadDataset([FromBody]Student set)
        {
            if(set != null)
            {
                AI a = new AI();
                return new OkObjectResult(a.GenerateFeedback(set));
            }
            else
            {
                return new BadRequestResult();
            }
        }
    }
}