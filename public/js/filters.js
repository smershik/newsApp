"use strict"

var newsApp = angular.module('newsApp');

newsApp.filter('filterByTags', function () {
  return function (items, tags) {
    var filtered = [];
    (items || []).forEach(function (item) {
      var matches = tags.some(function (tag) {
        return (item.sourceId.indexOf(tag.id) > -1);
      });
      if (matches) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});
