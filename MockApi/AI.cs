using ASP_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASP_API
{
    public class AI
    {
        public string GenerateFeedback(Student set)
        {
            string returnable = "";
            returnable += set.name + " : ";
            if(set.averageGrade > 8)
            {
                returnable += "Grades are good, focus on detailed information. ";
            }
            if(set.averageGrade <= 8 && set.averageGrade > 5)
            {
                returnable += "Grades could be better, focus on both core and details. ";
            }
            if(set.averageGrade <= 5)
            {
                returnable += "grades need to be improved, focus on the core concepts. ";
            }
            if(set.attendance > 5)
            {
                returnable += "Attendance is good, keep it up. ";
            }
            else
            {
                returnable += "Attendance is bad, make sure to attend classes. ";
            }
            return returnable;
        }
    }
}
