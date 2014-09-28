'use strict';

angular.module('kakakumeApp')
  .controller('CategoryListCtrl', ['$scope', function ($scope) {

    //データ構造
    //・商品リスト
    //・お店リスト
    //・カテゴリリスト
    //・実データリスト(価格は一個当たりで記録)
    // {
    //   item: string,
    //   store: string,
    //   category: string,
    //   price: int,
    //   isSale: bool,
    //   note: string
    // }

    var listItems = [
      {
        name: 'キャベツ',
        id: 'hogehoge'
      }, {
        name: 'なす',
        id: 'hogehoge'
      }, {
        name: 'きゅうり',
        id: 'hogehoge'
      }, {
        name: 'トマト',
        id: 'hogehoge'
      }
    ];


    $scope.onClickItem = onClickItem;

    function onClickItem (catId) {
      var options = {
        animation: 'slide',
        onTransitionEnd: function() {
          $scope.$apply(function () {
            $scope.items = listItems;
          });
        }
      };
      categoryListNav.pushPage("item-list.html", options);
    }

  }]);