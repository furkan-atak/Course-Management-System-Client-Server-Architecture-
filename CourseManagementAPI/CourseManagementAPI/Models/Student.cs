using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Student
    {
        public Student()
        {
            Takes = new HashSet<Take>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? DeptIdFk { get; set; }

        public virtual Department DeptIdFkNavigation { get; set; }
        public virtual ICollection<Take> Takes { get; set; }
    }
}
