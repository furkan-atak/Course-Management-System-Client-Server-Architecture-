using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Take
    {
        public int Id { get; set; }
        public int CourseIdFk { get; set; }
        public int StudentIdFk { get; set; }
        public string Semester { get; set; }
        public int? Year { get; set; }
        public int? Grade { get; set; }

        public virtual Course CourseIdFkNavigation { get; set; }
        public virtual Student StudentIdFkNavigation { get; set; }
    }
}
