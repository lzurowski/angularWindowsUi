var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap']);

app.value('app-version', '0.0.1');

app.config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {

    $routeProvider
        .when('/', {
            controller: 'ProductListCtrl',
            templateUrl: '/app/views/index.html'
        })
        .when('/404', {
            templateUrl: '404.html'
        })
        .otherwise({ redirectTo: '/404' })
        ;

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.controller('ProductListCtrl', ['$scope', '$uibModal', function ($scope, $uibModal) {

    $scope.items = [];

    $scope.openModal = function () {

        var modalInstance = $uibModal.open({
            backdrop: false,
            backdropClick: true,
            templateUrl: '/app/views/modal/modal.html',
            controller: 'ModalCtrl',
            windowTopClass: ' modalDR',
            //size: 'sm',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

}]);

app.controller('ModalCtrl', ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

app.directive('dragableModal', function(){
    return {
      restrict: 'EA',
      link: function(scope, element) {
          var elem = element.parent().parent().parent();
            elem.addClass("dragable-modal")
            elem.draggable({
                handle: ".dragHandle",
                start: function( event, ui ) {
                    $(".dragable-modal").css("z-index", "100");
                    elem.css("z-index", '100000')
                    
                }
            //containment: "window"
            
        });
        //$(".modal-dialog").draggable();
      }
    }  
});

app.directive('resizableModal', function(){
    return {
      restrict: 'EA',
      link: function(scope, element) {
        element.parent().resizable();
      }
    }  
});