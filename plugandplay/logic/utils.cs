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
        public static Dictionary<string, boUser> onlineUserData = new Dictionary<string, boUser>();
        public static DateTime currentDateTime(){
            return DateTime.UtcNow;
        }


        public static boUser getCurrentUser(string connectionId)
        {
            boUser obj = new boUser();
            onlineUserData.TryGetValue(connectionId, out obj);
            return obj;
        }

        public static string getuserColor(Guid userId)
        { 
            return ColorTranslator.ToHtml(Color.FromArgb(userId.GetHashCode()));
        }  
    }
}