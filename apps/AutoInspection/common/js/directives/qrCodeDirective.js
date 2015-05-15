 /****************************************************************************************
 *
 *  QR CODE DIRECTIVE
 *  @version (.1)
 *  @date (2015)
 *
 *****************************************************************************************/
 define(['./module'], function (directives) {
    'use strict';
    directives.directive('qrScanner', ['$timeout', 
        function ($timeout) {
        return {
            restrict: 'E',
            scope: {
              ngSuccess: '&ngSuccess',
              ngError: '&ngError',
              ngVideoError: '&ngVideoError'
            },
            link: function (scope,element,attrs) {
                // browser and device information
                window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                // video config
                var height = attrs.height || '100%';
                var width = attrs.width || '100%';
                var localMediaStream;
                var video = document.createElement('video');
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                // canvas config
                var canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'qr-canvas');
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                canvas.setAttribute('style', 'display:none;'); 
                // append video and canvas
                angular.element(element).append(video);
                angular.element(element).append(canvas);
                var context = canvas.getContext('2d'); 
                // scan function
                var scan = function() {
                    if (localMediaStream) {
                        context.drawImage(video, 0, 0, 307,250);
                        try {
                            qrcode.decode();
                        } catch(e) {
                            scope.ngError({error: e});
                        }
                    }
                    $timeout(scan, 500);
                }
                var successCallback = function (stream) {
                    video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                    localMediaStream = stream;
                    video.play();
                    $timeout(scan, 1000);
                }
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({video: true}, successCallback, function(e) {
                        scope.ngVideoError({error: e});
                    });
                } 
                else {
                    scope.ngVideoError({error: 'Native web camera streaming not supported in this browser. Please enter VIN manually.'});
                }
                qrcode.callback = function (data) {
                    scope.ngSuccess({data: data});
                };
            }
        };
    }]);
 });