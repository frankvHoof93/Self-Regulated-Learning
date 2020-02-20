using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CanvasDataCollector.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CanvasController : ControllerBase
    {
        private ICanvasDataService canvasDataService;

        public CanvasController(ICanvasDataService canvasDataService)
        {
            this.canvasDataService = canvasDataService;
        }

        [HttpPost("{id}")]
        public void CheckCanvas(int id)
        {
            canvasDataService.ProcessCanvasData(id);
        }
    }
}