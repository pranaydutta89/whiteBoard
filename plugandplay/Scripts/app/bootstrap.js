

var siteConfig={
       title:'Scrible Board'

}

var app = angular.module('app', ['ui.router', 'signalr', 'ui.bootstrap', 'luegg.directives']).run(['eventService','config', function (eventService,config) {
    //init service and reigster events
    document.title = config.title;
    
}]).config(['signalrServiceProvider', '$logProvider', '$compileProvider', function (signalrProvider, $logProvider, $compileProvider) {


    if (location.hostname != 'localhost') {
        $logProvider.debugEnabled(false);//disable the logger
        $compileProvider.debugInfoEnabled(false);
    }

    signalrProvider.config({
        logging: location.hostname =='localhost' ? true : false,
        register: [{
            hub: 'appHub',
            method: 'getOnlineUserList'
        }]
        
       
    })

}]).constant('config',siteConfig);