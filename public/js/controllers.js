'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  }).
  controller('CommandLineCtrl', function ($scope) {
    $scope.interaction_text = 'initial text';
    $scope.execute = function () {
      if ($scope.command_line == 'login') {
        $scope.interaction_text = "wana login?";
      } else {
        $scope.interaction_text = "command not known";
      };
    };
  });
