/**
 * Angular Application
 *
 * @author Van-Duyet Le <me@duyetdev.com>
 * @define {app} Main application scope
 */

'use strict';

var app = angular.module('app', []);

app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i = 1; i <= total; i++) {
            input.push(i);
        }

        return input;
    };
});

app.controller('mainController', function($scope) {

    // Initial
    $scope.appName = 'AppName';
    $scope.attrNum = 4;
    $scope.QNum = 4;

    $scope.matrix
});
