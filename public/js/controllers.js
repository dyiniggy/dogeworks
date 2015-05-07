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
  controller('CommandLineCtrl', function ($scope, socket) {
    $scope.interaction_text = [];
    $scope.global_state = "initial";
    $scope.command_counter = 0;
    var user = {"login_name":"igor","pwd":"igor"};
    $scope.execute = function () {
      $scope.command_counter+=1;
      var command = $scope.command_line.split(" ");
      switch ($scope.global_state) {
        case 'logged':
          switch (command[0]) {
            default:
              $scope.interaction_text.push({"counter":$scope.command_counter,"command":"command not known: "+$scope.command_line});
              $scope.command_line = "";
              break;
            case 'whoami':
              $scope.interaction_text.push({"counter":$scope.command_counter,"command":$scope.login_name});
              $scope.command_line = "";
            break;
          };
          break;
        case 'login':
          $scope.login_name = command[0];
          $scope.interaction_text.push({"counter":$scope.command_counter,"command":"insert password"});
          $scope.global_state = "pwd";
          $scope.command_line = "";
          break;
        case 'pwd':
          if (command[0] == user.pwd && $scope.login_name == user.login_name) {
            $scope.interaction_text.push({"counter":$scope.command_counter,"command":"logged in"});
            $scope.global_state = "logged";
            $scope.command_line = "";
          } else {
            $scope.interaction_text.push({"counter":$scope.command_counter,"command":"wrong user/pwd"});
            $scope.global_state = "initial";
            $scope.command_line = "";
          };
          break;
        case 'initial':
          switch (command[0]) {
            default:
              $scope.interaction_text.push({"counter":$scope.command_counter,"command":"command not known: "+$scope.command_line});
              $scope.command_line = "";
              break;
            case 'login':
              $scope.interaction_text.push({"counter":$scope.command_counter,"command":"wana login? enter your id"});
              $scope.global_state = "login";
              $scope.command_line = "";
              break;
            case 'chat':
              $scope.interaction_text.push({"counter":$scope.command_counter,"command":"must be logged in to chat"});
              $scope.command_line = "";
              break;
            case 'help':
            case '?':
              $scope.interaction_text.push({"counter":$scope.command_counter,"command":"no help available so far"});
              $scope.command_line = "";
              break;
          };
          break;

      };

      /*
      if ($scope.command_line == 'login') {
        $scope.interaction_text.push("wana login? enter your id");
        $scope.command_line = "";
      } else {
        $scope.interaction_text.push("command not known: "+$scope.command_line);
        $scope.command_line = "";
      };*/

    };
  });
