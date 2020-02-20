using ASP_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASP_API
{
    public class CanvasService
    {

        private static List<Student> students = new List<Student>();
        private static List<string> names = new List<string>() {"allie Mallard","Gillian Seyfried","Riva Delarosa","Pamila Oquinn","Karyn Coger","Patrica Rappaport","Hannah Bagnell","Harry Blackmore","Candance Hite","Patrick Horwitz","Lorelei Bibb","Shawanna Alderete","Suzette Hiebert","Therese Duchesne","Albina Agnew","Newton Yoakum","Beatris Kohler","Diane Hildebrandt","Refugio Salamanca","Yer Mannion","Britney Boris","Huey Clemens","Terra Moen","Shantell Reagan","Belinda Wickstrom","Yoshie Prager","Donnie Kruse","Rhiannon Mccloud","Heide Foran","Myrtis Bodily","Aurora Teets","Maxima Kocher","Ariana Krach","Francisca Foy","Delcie Thiede","Fanny Lingo","Arlie Milbourne","Ira Lesure","Domenic Legrand","Angelia Derose","Sharonda Wydra","Erinn Digby","Emiko Finn","Gino Sprau","Janell Corning","Esmeralda Calkins","Wade Bruton","Bertie Orme","Gisele Loveday"};
        private static readonly object padlock = new object();
        private static CanvasService instance = null;

        public CanvasService()
        {
        }

        public static CanvasService Instance
        {
            get
            {
                if(instance == null)
                {
                    lock (padlock)
                    {
                        if(instance == null)
                        {
                            instance = new CanvasService();
                        }
                    }
                }
                return instance;
            }
        }

        public  Student RetrieveStudent(int id)
        {
            foreach (Student s in students)
            {
                if(s.studentId == id)
                {
                    return s;
                }
            }

            return GenerateNewUser(id);
        }

        private static Student GenerateNewUser(int id)
        {
            Student s = new Student();
            s.studentId = id;
            s.name = RetrieveRandomName();
            s.attendance = new Random().Next(1, 11);
            s.averageGrade = new Random().Next(1, 11);
            students.Add(s);
            return s;
        }

        private static string RetrieveRandomName()
        {
            return names[new Random().Next(names.Count)];
        }


        
    }
}
