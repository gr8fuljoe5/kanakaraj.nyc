angular.module('joek', ['restangular', 'ui.router', 'angularLoad'])
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
            templateUrl: 'components/footer/footer.html',
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
            $log.log('about CONTROLLER INITIATED');
        }
      })
      .state('base.skillset', {
        url: 'skillset',
        templateUrl: 'app/skillset/skillset.html',
        controller: function($log){
          $log.log('skillset CONTROLLER INITIATED');
        }
      }).state('base.recommendations', {
        url: 'recommendations',
        templateUrl: 'app/recommendations/recommendations.html',
        controller: function($log, $scope, $timeout){
          $log.log('recommendations CONTROLLER INITIATED');
          $timeout(function(){
            $log.log('timeout');
            IN.API.Profile("me").fields(
              [ "id", "firstName", "lastName", "pictureUrl",
                "recommendations-received" ]).result(function(result) {
                //set the model
                $scope.dataLoaded = true;
                $scope.$apply(function() {
                  $scope.jsondata = result.values[0];
                  $scope.recommendations = result.values[0].recommendationsReceived.values;
                  $log.log(result.values[0].recommendationsReceived.values);
                });
              }).error(function(err) {
                $scope.$apply(function() {
                  $scope.error = err;
                });
              });
          },500);




          //IN.init({
          //    'api_key': '77x21bjyyai92t',
          //    'authorize': true
          //});

          //$scope.IN = IN.API;
          //
          //$log.log(IN);
          //$log.log(IN.API)
          //
          //$scope.$watch('IN', function(){
          //  if(IN.API.Profile()){
          //    $log.log(IN.API.Profile("me").fields(["firstName","headline"]).result(function(result) {console.log(result)}));
          //
          //  }
          //
          //});

          //IN.API.Profile("me");


            //.fields(["firstName","headline"])
            //.result(function(result) {
            //  $log.log(result);
            //});



        }
      });

    //

    $urlRouterProvider.otherwise('/');
  })
;
