﻿using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;
[assembly: OwinStartupAttribute(typeof(plugandplay.Startup))]
namespace plugandplay
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            var hubConfiguration = new HubConfiguration();
            hubConfiguration.EnableDetailedErrors = true;
            app.MapSignalR(hubConfiguration);
            
        }
    }
}
