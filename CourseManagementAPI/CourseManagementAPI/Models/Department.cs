using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Department
    {
        public Department()
        {
            Courses = new HashSet<Course>();
            Students = new HashSet<Student>();
            Teachers = new HashSet<Teacher>();
        }

        public int Id { get; set; }
        public string DeptName { get; set; }
        public string Address { get; set; }
        public string Dean { get; set; }

        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Student> Students { get; set; }
        public virtual ICollection<Teacher> Teachers { get; set; }
    }
}
