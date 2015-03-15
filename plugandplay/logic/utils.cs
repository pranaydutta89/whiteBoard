using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using plugandplay.Models;
using System.Drawing;
namespace plugandplay.logic
{
    public class utils
    {


        public static DateTime currentDateTime
        {

            get
            {
                return DateTime.UtcNow;
            }
        }


        public static string getuserColor(Guid userId)
        {
            return ColorTranslator.ToHtml(Color.FromArgb(userId.GetHashCode()));
        }
    }
}