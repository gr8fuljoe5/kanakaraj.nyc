angular.module('joek', ['restangular', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('base', {
        url: '/',
        views : {
          'header' : {
            templateUrl : 'components/navbar/navbar.html',
            controller : ['$scope','$log',function($scope,$log){
                $log.log('header loaded');
            }]
          },
          'footer' : {
            template: '<div>{{text}}}</div>',
            controller: ['$scope', '$log', function($scope,$log){
              $scope.text = 'FOOTER GOES HERE!';
            }]
          },
          'main' : {
            templateUrl : 'app/main/main.html',
            controller: ['$scope', '$log', function($scope,$log){
              $scope.main = 'header';
              $log.log('main section initiated');
            }]
          }
        }
      })
      .state('base.about', {
        url: 'about',
        templateUrl: 'app/about/about.html',
        controller: function($log){
            $log.log('MAIN CONTROLLER INITIATED');
        }
      });

    $urlRouterProvider.otherwise('/');
  })
;
