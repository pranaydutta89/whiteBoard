using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using plugandplay.logic;
using plugandplay.Models;
namespace plugandplay.controller
{
    public class userController : ApiController
    {
        public boGroup getGroupNameStatus(string groupName)
        {
            return (from data in user.onlineUserData
                    where data.Value.inGroup.groupName == groupName
                    select data.Value.inGroup).SingleOrDefault();
        }
    }
}
