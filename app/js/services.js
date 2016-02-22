'use strict';

var phoneMartServices=angular.module('phoneMartServices',['ngResource']);

phoneMartServices.factory('navList', function($resource) {
  return $resource('headers/headers.json',{},{getData:{method:'Get',isArray:true}});
});

phoneMartServices.service('searchedPhoneService',function(){
    var searchString;
    return{
        getSearchString:function(){
            return searchString;
        },
        setSearchString:function(searchString){
            searchString= searchString;
        }
    };
});

