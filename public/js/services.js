"use strict"

var newsApp = angular.module('newsApp');

newsApp.factory('Sources', 
	['$resource', function($resource){
		return $resource('https://newsapi.org/v1/sources',
			{ language: 'en'}, // Query parameters
      		{'query': { method: 'GET' }}
      		)
}]);

newsApp.factory('Articles', 
	['$resource', function($resource){
		return $resource('https://newsapi.org/v1/articles?source=:sourceId',
			{apiKey: '34aeb128e5224b0f8d3d9b8a340dd1c3'}, // Query parameters
      		{'query': { method: 'GET' }}
      		)
}]);

newsApp.factory('News', ['$http','Sources','Articles','localStorageService', 
	function($http, Sources, Articles, localStorageService){

	var news = this;
	news.sources = [];
	news.tags = [];
	news.articles = [];

	var QuerySourcesSuccessCb = function(data){
		data.sources.forEach( function(source) {
			news.sources.push({'id':source.id, 'text': source.name});
		});
		//add random source to tag filter
		news.tags.push(news.sources[Math.floor(Math.random()*news.sources.length)]);
		data.sources.forEach( function(source) {
			Articles.query({sourceId: source.id},function(data){
			data.articles.forEach( function(article) {
				article["id"]=_.join(_.words(article.title.slice(0,20)),'-');
				article["sourceId"]=source.id;
				article["sourceName"]=source.name;
				article["category"]=source.category;
				news.articles.push(article);
				});
			});
		});
		
	};

	Sources.query({},QuerySourcesSuccessCb);

	news.getArticle = function (articleId){
		return _.find(news.articles,{id: articleId}) || '';
	};

	news.getArticleFromSaved = function (articleId){
		return _.find(news.getSavedArticles(),{id: articleId}) || '';
	};

	news.getSavedArticles = function () {
		var result = localStorageService.get('articles');
		return result || [];
	};

	news.saveArticle = function (article) {
		var savedArticles = news.getSavedArticles();
		savedArticles.push(article);
		localStorageService.set('articles',savedArticles);
	};

	news.saveArticleById = function (articleId) {
		var savedArticles = news.getSavedArticles();
		var article = news.getArticle(articleId);
		savedArticles.push(article);
		localStorageService.set('articles',savedArticles);
	};

	news.deleteArticle = function(articleId) {
		var savedArticles = news.getSavedArticles();
		savedArticles = _.filter(savedArticles,obj => obj.id!==articleId);
		localStorageService.set('articles',savedArticles);
	};

	news.isArticleSaved = function(articleId){
		return (_.find(news.getSavedArticles(),{id: articleId}))!==undefined;
	}

	return news;

}]);

newsApp.factory('CustomNews', ['localStorageService', 
	function(localStorageService){
		var customNews = {
			getCustomArticles: function(){
				var result = localStorageService.get('custom_articles');
				return result || [];
			},
			addCustomArticle: function(article){
				var customArticles = this.getCustomArticles();
				customArticles.push(article);
				console.log(customArticles);
				localStorageService.set('custom_articles',customArticles);
			},
			deleteCustomArticle: function(articleId){
				var customArticles = this.getCustomArticles();
				customArticles = _.filter(customArticles,obj => obj.id!==articleId);
				localStorageService.set('custom_articles',customArticles);
			},
			getCustomArticle: function(articleId){
				return _.find(this.getCustomArticles(),{id: articleId}) || '';
			},
			generateId: function(){
  				return '_' + Math.random().toString(36).substr(2, 9);
  			}
			
		};

		return customNews;

}]);