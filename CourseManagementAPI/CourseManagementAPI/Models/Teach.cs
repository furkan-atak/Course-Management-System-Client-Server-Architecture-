using System;
using System.Collections.Generic;

#nullable disable

namespace CourseManagementAPI.Models
{
    public partial class Teach
    {
        public int Id { get; set; }
        public int CourseIdFkk { get; set; }
        public int TeacherIdFk { get; set; }
        public string Semester { get; set; }
        public int? Year { get; set; }

        public virtual Course CourseIdFkkNavigation { get; set; }
        public virtual Teacher TeacherIdFkNavigation { get; set; }
    }
}
