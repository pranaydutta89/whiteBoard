
app.directive("drawing", ['signalrService', function (signalrService) {
    return {
        restrict: "A",
        scope: {
            lastxcor: '=',
            lastycor: '=',
            currxcor: '=',
            currycor: '=',
            color:'='
        },
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');
            ctx.strokeStyle = scope.color;
            // variable that decides if something should be drawn on mousemove
            var drawing = false;

            // the last coordinates before the current move
            var lastX,lastY,currentX,currentY;
            


            var drawPointer = {
                start: function (event) {
                    lastX = event.offsetX;
                    lastY = event.offsetY;

                    // begins new line
                    ctx.beginPath();

                    drawing = true;
                },

                move: function (event) {

                    if (drawing) {
                        // get current mouse position
                        currentX = event.offsetX;
                        currentY = event.offsetY;

                        draw(lastX, lastY, currentX, currentY);

                        // set current coordinates to last one
                        lastX = currentX;
                        lastY = currentY;
                    }

                },
                stop: function () {
                    drawing = false;
                }
            }



            element.bind('mousedown', drawPointer.start);
            element.bind('mousemove', drawPointer.move);
            element.bind('mouseup', drawPointer.stop);



            function draw(lX, lY, cX, cY, flag) {

                ctx.beginPath();
                if (lX == 0 && lY == 0 && cX == 0 && cY == 0) {
                    //clearing
                    ctx.clearRect(0, 0, element[0].width, element[0].height);

                    return;
                }

                // line from
                ctx.moveTo(lX, lY);
                // to
                ctx.lineTo(cX, cY);
                // color
              
                // draw it
                ctx.stroke();

                if (!flag) {
                    signalrService.invoke('appHub', 'draw', {
                        lastX: lX,
                        lastY: lY,
                        currentX: cX,
                        currentY: cY

                    });
                }
            }


            scope.$watchGroup(['lastxcor', 'lastycor', 'currxcor', 'currycor'], function (newValues, oldValues, scope) {

                draw(newValues[0], newValues[1], newValues[2], newValues[3], true)

            })
        }
    };
}]);
