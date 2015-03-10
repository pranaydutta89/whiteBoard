using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace plugandplay.Models
{

    public class boChatMessage
    {
        public boUser user { get; set; }
        public string message { get; set; }
        public DateTime addedDateTime { get; set; }
    }

    public class boUser
    {
        public Guid userId { get; set; }
        public string userName { get; set; }


        public string groupName { get; set; }

        public string userColor { get; set; }
        public DateTime addedDateTime { get; set; }
    }

    public class boDrawCanvas
    {
        public string lastX { get; set; }
        public string lastY { get; set; }
        public string currentX { get; set; }

        public string currentY { get; set; }

        public boUser user { get; set; }
    }
}