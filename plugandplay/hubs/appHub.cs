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

             if (user.onlineUserData.ContainsKey(Context.ConnectionId))
                offlineUsers(Context.ConnectionId);
            return base.OnDisconnected(stop);
        }

        public bool checkUserOnlineStatus()
        {
            
            return user.onlineUserData.ContainsKey(Context.ConnectionId); 
            
        }

        public boUser addUser(boUser login)
        {
            if (!user.onlineUserData.ContainsKey(Context.ConnectionId))
            {
                login.addedDateTime = utils.currentDateTime;
                login.userId = Guid.NewGuid();
                login.userColor = utils.getuserColor(login.userId);
                login.onlineStatus = 1;//online
                login.inGroup.createdDateTime = utils.currentDateTime;
                user.onlineUserData.Add(Context.ConnectionId, login);
            }
            Groups.Add(Context.ConnectionId, login.inGroup.groupName);
            return login;

        }

        public void changeUserOnlineStatus(int onlineStatus)
        {
            boUser objUser =user.getCurrentUser(Context.ConnectionId);
            objUser.onlineStatus =onlineStatus;
            user.changeUserObject(Context.ConnectionId, objUser);
            getOnlineUsers();
        }

        public void getOnlineUsers()
        {
            List<boUser> objLogin = (from data in user.onlineUserData
                                      where data.Value.inGroup.groupName == user.getCurrentUser(Context.ConnectionId).inGroup.groupName
                                      select data.Value).ToList();
            Clients.Group(objLogin[0].inGroup.groupName).getOnlineUserList(objLogin);
        }

        public void offlineUsers(string connectionId)
        {
            
            string groupName = user.getCurrentUser(connectionId).inGroup.groupName;

            if (user.onlineUserData.ContainsKey(Context.ConnectionId))
            {
                user.onlineUserData.Remove(Context.ConnectionId);
            }

            Clients.Group(groupName).getOnlineUserList((from data in user.onlineUserData
                                                        where data.Value.inGroup.groupName == groupName
                                                        select data.Value).ToList());
        }


        public void sendMessage(boChatMessage objMessage)
        {
        
            objMessage.user = user.getCurrentUser(Context.ConnectionId);
            objMessage.addedDateTime = utils.currentDateTime;
            Clients.Group(objMessage.user.inGroup.groupName).sendMessageClient(objMessage);
        }


        public void draw(boDrawCanvas obj)
        {
            boUser objUser = user.getCurrentUser(Context.ConnectionId);
            obj.user = objUser;
            Clients.OthersInGroup(objUser.inGroup.groupName).drawCanvas(obj);
        }


        public void typingSignal()
        {
            boUser objLogin = user.getCurrentUser(Context.ConnectionId);
            Clients.OthersInGroup(objLogin.inGroup.groupName).typingSignalClient(objLogin.userName);
        }

    }
}
