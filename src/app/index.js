angular.module('joek', ['restangular', 'ui.router', 'angularLoad', 'angular-inview'])
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
        controller: function($log, $interval){
          $log.log('skillset CONTROLLER INITIATED');
          var quotes = [
            {"text": "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.",
              "author" : "Linus Torvalds"},

            {"text": "Those people who think they know everything are a great annoyance to those of us who do.",
              "author" : "Isaac Asimov"},

            {"text": "The true sign of intelligence is not knowledge but imagination.",
              "author" : "Albert Einstein"},

            {"text": "No man's knowledge here can go beyond his experience.",
              "author" : "John Locke"},

            {"text": "People who work together will win, whether it be against complex football defenses, or the problems of modern society.",
              "author": "Vince Lombardi"}
          ];

          function generateQuote(){
            var randomNum = Math.floor(Math.random() * quotes.length)
            var elem = document.querySelector('.quote');
            var quote = '<div class="animated fadeIn">' + quotes[randomNum].text + '<cite>' + quotes[randomNum].author + '</cite></div>';
            //$log.log(quotes[randomNum].text + '<cite>' + quotes[randomNum].author + '</cite>');
            elem.innerHTML = '';
            elem.innerHTML = quote;
          }
          generateQuote();
          $interval(function(){
            //$log.log('interval');
            generateQuote();
          },10000);

          var colors = [
            '132,112,255',
            '100,149,237',
            '176,224,230',
            '85,107,47',
            '244,164,96',
            '255,140,0',
            '148,0,211',
            '255,215,0',
            '46,139,87'
          ];
          var chart = d3.selectAll('.skillset-chart')
            .attr('width', '200')
            .attr('height', '15')
            .style('background-color', 'rgb(200, 200, 196)');

          chart.each(function(d,i){
            var thisChart = d3.select(this);

            var attrs = {
              'stroke' : 'none',
              'fill' : 'rgb('+colors[i]+')',
              'width': this.getAttribute('data-range') * 2,
              'height':'15',
              'x': '0',
              'y': '0',
              'rx' : '3',
              'ry' : '3'
            };
            thisChart.append('rect')
              .attr('width', 0)
              .attr('fill','rgb(30,144,255)')
              .transition()
              .delay(3000)
              .duration(1500)
              .attr(attrs)
          });
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
        }
      });

    //

    $urlRouterProvider.otherwise('/about');
  })
;
