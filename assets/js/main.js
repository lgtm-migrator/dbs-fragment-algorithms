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

app.directive('autoNext', ['$parse', function($parse) {
    return {
        restrict: 'A',
        require: ['ngModel'],
        link: function(scope, element, attrs, ctrls) {
            var model=ctrls[0], form=ctrls[1];
            
            scope.next = function(){
                return model.$valid
            }
            
            scope.$watch(scope.next, function(newValue, oldValue){
                if (newValue && model.$dirty)
                {
                    var nextinput = element.next('input');
                    if (nextinput.length === 1)
                    {
                        nextinput[0].focus();
                    }
                }
            })
        }
    }
}]);

app.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);

app.controller('mainController', function($scope) {

    // Initial
    $scope.appName = 'AppName';
    $scope.attrNum = 4;
    $scope.QNum = 4;
    $scope.useMatrix = [];
    $scope.truyxuatMatrix = [];


    $scope.Aff = function(x, y) {
    	// Find q 
    	var aff_list = [];
    	for (var i = 1; i <= this.attrNum; i++) {
    		if (this.useMatrix[i][x] == 1 && this.useMatrix[i][y] == 1) {
    			aff_list.push(i);
    		}
    	}

    	// Sum Aff 
    	var aff_result = aff_list.map(function(q) {
    		if (!$scope.truyxuatMatrix[q]) return 0;

    		var sum_q = 0;
			for (var i in $scope.truyxuatMatrix[q]) sum_q += $scope.truyxuatMatrix[q][i];

			return sum_q;
    	})

    	if (aff_result.length) return aff_result.reduce(function(x,y) { return x + y });
    	return 0;
    }

    $scope.validateUseMatrix = function(value) {
    	value = parseInt('' + value)
    	if (value != 0 && value != 1) return alert('Please 0 or 1: ' + value);
    }

    $scope.reset = function() {
    	$scope.attrNum = 4;
	    $scope.QNum = 4;
	    $scope.useMatrix = [];
	    $scope.truyxuatMatrix = [];
    }
});
