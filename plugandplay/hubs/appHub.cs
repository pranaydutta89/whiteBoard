using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using plugandplay.Models;
using plugandplay.logic;
namespace plugandplay.hubs
{
    public class appHub : Hub
    {

       
        public override Task OnDisconnected(bool stop)
        {

             if (utils.onlineUserData.ContainsKey(Context.ConnectionId))
                offlineUsers(Context.ConnectionId);
            return base.OnDisconnected(stop);
        }

        public bool checkUserOnlineStatus()
        {
            
            return utils.onlineUserData.ContainsKey(Context.ConnectionId); 
            
        }

        public boUser addUser(boUser login)
        {
            if (!utils.onlineUserData.ContainsKey(Context.ConnectionId))
            {
                login.addedDateTime = utils.currentDateTime();
                login.userId = Guid.NewGuid();
                login.userColor = utils.getuserColor(login.userId);
                utils.onlineUserData.Add(Context.ConnectionId, login);
            }
            Groups.Add(Context.ConnectionId, login.groupName);
            return login;

        }

        public void getOnlineUsers()
        {
            List<boUser> objLogin = (from data in utils.onlineUserData
                                      where data.Value.groupName == utils.getCurrentUser(Context.ConnectionId).groupName
                                      select data.Value).ToList();
            Clients.Group(objLogin[0].groupName).getOnlineUserList(objLogin);
        }

        public void offlineUsers(string connectionId)
        {
            
            string groupName = utils.getCurrentUser(connectionId).groupName;

            if (utils.onlineUserData.ContainsKey(Context.ConnectionId))
            {
                utils.onlineUserData.Remove(Context.ConnectionId);
            }

            Clients.Group(groupName).getOnlineUserList((from data in utils.onlineUserData
                                                        where data.Value.groupName == groupName
                                                        select data.Value).ToList());
        }


        public void sendMessage(boChatMessage objMessage)
        {
        
            objMessage.user = utils.getCurrentUser(Context.ConnectionId);
            objMessage.addedDateTime = utils.currentDateTime();
            Clients.Group(objMessage.user.groupName).sendMessageClient(objMessage);
        }


        public void draw(boDrawCanvas obj)
        {
            boUser objLogin = utils.getCurrentUser(Context.ConnectionId);
            Clients.OthersInGroup(objLogin.groupName).drawCanvas(obj);
        }


        public void typingSignal()
        {
            boUser objLogin = utils.getCurrentUser(Context.ConnectionId);
            Clients.OthersInGroup(objLogin.groupName).typingSignalClient(objLogin.userName);
        }

    }
}
