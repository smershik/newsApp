"use strict"

var newsApp = angular.module('newsApp',['ngTagsInput','ngRoute', 'ngResource', 'LocalStorageModule']);

newsApp.config(['$routeProvider','$locationProvider','localStorageServiceProvider',
	function($routeProvider,$locationProvider,localStorageServiceProvider){

	$routeProvider
		.when('/',{
			templateUrl:'template/news.html',
			controller:'newsListCtrl'
		})
		.when('/saved',{
			templateUrl:'template/saved.html',
			controller:'SavedNewsListCtrl'
		})
		.when('/custom',{
			templateUrl:'template/custom.html',
			controller:'CustomNewsListCtrl'
		})
		.when('/articles/:articleId',{
			templateUrl:'template/article-details.html',
			controller:'ArticleDetailCtrl'
		})
		.when('/custom-articles/:articleId',{
			templateUrl:'template/custom-article-details.html',
			controller:'CustomArticleDetailCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

	localStorageServiceProvider.setPrefix('newsApp');

}]);


