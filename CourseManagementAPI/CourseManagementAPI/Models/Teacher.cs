using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Teaches = new HashSet<Teach>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? DeptId { get; set; }
        public string Title { get; set; }

        public virtual Department Dept { get; set; }
        public virtual ICollection<Teach> Teaches { get; set; }
    }
}
