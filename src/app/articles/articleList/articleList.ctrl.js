angular.module("articleManagement").controller("articleListCtrl", [
  "$state",
  "articleService",
  function ($state, articleService) {
    articleService.listArticle();
  },
]);
