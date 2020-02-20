using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASP_API.Models
{
    public class Student
    {

        public int studentId { get; set; }
        public string name { get; set; }
        public int averageGrade { get; set; }
        public int attendance { get; set; }
    }
}
