using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using plugandplay.logic;
namespace plugandplay.controller
{
    public class userController : ApiController
    {
        public bool getGroupNameStatus(string groupName)
        {
            return (from data in user.onlineUserData
                    where data.Value.groupName == groupName
                    select data).ToList().Count() == 0 ? false : true;
        }
    }
}
