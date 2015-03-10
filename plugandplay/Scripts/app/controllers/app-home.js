app.controller('homeController', ['$scope', 'signalrService', '$rootScope', '$timeout', 'config', function ($scope, signalrService, $rootScope, $timeout, config) {
     

    var unnreadMessages =0;


    signalrService.invoke('appHub', 'getOnlineUsers')
    signalrService.on('appHub', 'getOnlineUserList', function (userList) {
        $scope.userList = userList;
        $scope.$apply();
    });
    signalrService.on('appHub', 'drawCanvas', function (canvasData) {
            $scope.canvasDraw = canvasData;
            $scope.$apply();
        
    });

    $scope.sendMessage = function () {
        if ($scope.message && $scope.message.trim() !=='')
        signalrService.invoke('appHub', 'sendMessage', {message:$scope.message});
    }

    $scope.clearCanvas = function () {
        var ctx = $('canvas')[0].getContext('2d');
        ctx.clearRect(0, 0, $('canvas')[0].width, $('canvas')[0].height);
        signalrService.invoke('appHub', 'draw', {
            lastX: 0,
            lastY: 0,
            currentX: 0,
            currentY: 0

        });
    }

    
    $rootScope.$on('windowFocus', function () {
        unnreadMessages = 0;
        document.title = config.title;
    });


    signalrService.on('appHub', 'sendMessageClient', function (messageData) {

        var x = typeof messageData;
        if ($scope.messageList)
            $scope.messageList.push(messageData);
        else {
            $scope.messageList = [];
            $scope.messageList.push(messageData);
        }


        if (!$rootScope.isWindowFocused) {
            document.title = '(' + (++unnreadMessages) + ') ' + config.title;
            
        }
       
        //if message was sent by me then on clear the textbox else not 
        if (messageData.user.userId == $rootScope.user.userId) {
            $scope.message = '';
        }

        $scope.$apply();
     
     
    });

    $scope.$watch('message', function () {

        signalrService.invoke('appHub', 'typingSignal')

    });

    signalrService.on('appHub', 'typingSignalClient', function (username) {
        $scope.whoIsTyping = username;
        $scope.$apply();
        $timeout(function () {
            $scope.whoIsTyping = null;
        },1000)

    });

}]);