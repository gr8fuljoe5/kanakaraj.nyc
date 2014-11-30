
angular
  .module('joek')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope'];

/* @ngInject */
function MainCtrl($scope) {
  /* jshint validthis: true */
  var vm = this;

  vm.activate = activate;
  vm.title = 'MainCtrl';

  activate();

  ////////////////

  function activate() {
    alert('hello');
    $scope.main = 'testing';
  }


}
