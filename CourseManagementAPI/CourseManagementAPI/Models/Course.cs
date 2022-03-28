using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Course
    {
        public Course()
        {
            Takes = new HashSet<Take>();
            Teaches = new HashSet<Teach>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int DeptIdFk { get; set; }
        public DateTime? Date { get; set; }
        public int Credit { get; set; }
        public string Place { get; set; }

        public virtual Department DeptIdFkNavigation { get; set; }
        public virtual ICollection<Take> Takes { get; set; }
        public virtual ICollection<Teach> Teaches { get; set; }
    }
}
