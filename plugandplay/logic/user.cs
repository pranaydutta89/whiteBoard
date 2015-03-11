using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using plugandplay.Models;
namespace plugandplay.logic
{
    public class user
    {
        public static Dictionary<string, boUser> onlineUserData = new Dictionary<string, boUser>();

        public static boUser getCurrentUser(string connectionId)
        {
            boUser obj = new boUser();
            onlineUserData.TryGetValue(connectionId, out obj);
            return obj;
        }

        public static void changeUserObject(string connectionId,boUser objUser){

            if (onlineUserData.Remove(connectionId))
            {
                onlineUserData.Add(connectionId, objUser);
            }

        }

    }
}