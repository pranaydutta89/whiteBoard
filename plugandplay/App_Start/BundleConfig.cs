using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.UI;

namespace plugandplay
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkID=303951
        public static void RegisterBundles(BundleCollection bundles)
        {

            //BundleTable.EnableOptimizations = true;
            

            bundles.Add(new ScriptBundle("~/bundles/appjs").Include(
                            "~/Scripts/jquery.js",
                            "~/Scripts/bootstrap.js",
                            "~/Scripts/angular.js",
                            "~/Scripts/angular-ui-router.js",
                            "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                            "~/Scripts/jquery.signalR-2.2.0.js",
                            "~/Scripts/app/bootstrap.js",
                            "~/Scripts/app/services/app-*",
                            "~/Scripts/app/router/app-*",
                            "~/Scripts/app/controllers/app-*",
                            "~/Scripts/app/directive/app-*",
                            "~/Scripts/scrollglue.js"
                           ));



            bundles.Add(new StyleBundle("~/bundles/appcss").Include(
                            "~/Content/css/_*"
                           ));

        }
    }
}