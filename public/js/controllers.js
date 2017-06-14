"use strict"

var newsApp = angular.module('newsApp');

newsApp.controller('newsListCtrl', ['$scope','News', function($scope, News){
	$scope.sources = News.sources;
	$scope.news = News.articles;
	$scope.tagsSources = News.tags;
	$scope.saveArticle = News.saveArticle;
	$scope.isArticleSaved = News.isArticleSaved;
	$scope.deleteArticle = News.deleteArticle;
	
	$scope.loadTags = function($query) {
    	return $scope.sources.filter(function(source) {
	        return source.text.toLowerCase().indexOf($query.toLowerCase()) != -1;
	    });
  	};

}]);

//Saved News Controller
newsApp.controller('SavedNewsListCtrl',['$scope','News', function($scope, News) {
	$scope.isArticleSaved = News.isArticleSaved;
	$scope.news = News.getSavedArticles();

	$scope.deleteArticle = function(articleId){
		$scope.news = _.filter($scope.news, obj => obj.id!==articleId);
		News.deleteArticle(articleId);
	} 
}]);

//Custom News Controller
newsApp.controller('CustomNewsListCtrl',['$scope', 'CustomNews', function($scope,CustomNews) {
	$scope.customNews = CustomNews.getCustomArticles();
		$scope.newsTitle = '';
		$scope.newsText = '';

	$scope.addCustomArticle = function(){
		var article = {
			id: CustomNews.generateId(),
			title: $scope.newsTitle,
			text: $scope.newsText,
			publishedAt: Date.now()

		};
		CustomNews.addCustomArticle(article);
		$scope.customNews = CustomNews.getCustomArticles();
		$scope.newsTitle = '';
		$scope.newsText = '';
	};

	$scope.deleteCustomArticle = function(articleId){
		$scope.customNews = _.filter($scope.customNews, obj => obj.id!==articleId);
		CustomNews.deleteCustomArticle(articleId);
	}
	$scope.getCustomArticle = CustomNews.getCustomArticle;
}]);


//Article Detail Controller
newsApp.controller('ArticleDetailCtrl',['$scope', '$routeParams','News', 
	function($scope, $routeParams, News) {
	  	$scope.isArticleSaved = News.isArticleSaved;
	  	$scope.article = $scope.isArticleSaved($routeParams.articleId)?News.getArticleFromSaved($routeParams.articleId):News.getArticle($routeParams.articleId);
	  	$scope.saveArticle = News.saveArticle;
	  	$scope.deleteArticle = News.deleteArticle;
	
}]);

newsApp.controller('CustomArticleDetailCtrl',['$scope', '$routeParams','CustomNews', 
	function($scope, $routeParams, CustomNews) {
	  	$scope.article = CustomNews.getCustomArticle($routeParams.articleId);
	  	$scope.deleteArticle = CustomNews.deleteCustomArticle;
}]);

newsApp.controller('HeaderController',['$scope','$location', 
	function($scope, $location) {
	  	$scope.isActive = function (viewLocation) {
        	return viewLocation === $location.path();
    };
}]);

