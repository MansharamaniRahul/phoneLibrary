'use strict';

var takeAwayModule=angular.module('electroMart',['ngRoute','ngMaterial','ui.router','phoneMartControllers','phoneMartServices']);


takeAwayModule.config(function($stateProvider, $urlRouterProvider){
    
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home',{
        url:'/home',
        templateUrl:'partial/home.html',
        controller:'homeController'
    })
    .state('topRated',{
        url:'/topRated',
        templateUrl:'partial/topRated.html',
        controller:'topRatedController'
    })
    .state('crud',{
        url:'/crud',
        templateUrl:'partial/crudDemo.html',
        controller:'crudController'
    })
    
    
    
    
	/*$routeProvider.
	when('/home',{
		templateUrl:'partial/home.html',
		controller:'homeController'
	}).
	when('/myOrders',{
		templateUrl:'partial/myOrders.html',
		controller:'myOrdersController'
	}).
	otherwise({
		templateUrl:'partial/home.html',
		controller:'homeController'

	});*/
});

//takeAwayModule.controller('homeController',['$scope','$http',function($scope,$http){
//        debugger;
//        console.log('calling REST service from Home..');
//        $http.get('/home').success(function(phoneList){
//            console.log('Success from REST Service...');
//            $scope.phoneList=phoneList;
//        })
//        .error(function(errorFromServer){
//            console.log('Error from REST Service...');
//            if(errorFromServer)
//            $scope.errorMessage=errorFromServer;
//        });
//        console.log('Call to REST Service from Home completed...');
//    }]);