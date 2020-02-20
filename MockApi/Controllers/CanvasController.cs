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
    public class CanvasController : ControllerBase
    {
        private readonly CanvasService service;

        public CanvasController(CanvasService service)
        {
            this.service = service;
        }

        [HttpGet("{id}")]
        public Student RetrieveStudent(int id)
        {
            Student data = new Student();
            data = service.RetrieveStudent(id);
            return data;
        }
    }
}