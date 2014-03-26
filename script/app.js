var app = angular.module('community', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider.when('/compare/:communities_to_compare', {
    templateUrl: 'compare.html',
    controller: 'CompareController'
  });

  $routeProvider.otherwise({
    templateUrl: 'match.html',
    controller: 'MatchController'
  });

  $locationProvider.html5Mode(false).hashPrefix('!');
});

app.factory('communities', function(){
  return _.keys(population_data);
});

app.factory('sectors', function(){
  return _.uniq(_.values(sector_data));
});

app.filter('join', function(){

  return function(input){
    if(!input || input.length == 0){
      return "";
    }

    var length = input.length;
    return _.take(input, length - 1).join(', ') + ' and ' + input[input.length -1];
  };

});

app.controller('CompareController', function($scope, $rootScope, $route){
  $rootScope.tab = 'compare';

  $scope.communities_to_compare = $route.current.params.communities_to_compare.split(',');

});

app.controller('MatchController', function($scope, $rootScope, $filter, $location, communities, sectors){
  $rootScope.tab = 'match';
  $scope.user_profile = new UserProfile($scope);
  $scope.ranked_communities = [];
  $scope.sectors = sectors;
  $scope.compare_disabled = true;

  $scope.match = function(){
    $scope.user_profile = new UserProfile($scope);
    $scope.ranked_communities = $scope.user_profile.rankedCommunities(communities, 10);
  };

  $scope.select_community = function (community) {
    $scope.compare_communities = $filter('filter')($scope.ranked_communities, {selected: true});
    $scope.compare_disabled = $scope.compare_communities.length === 0;
  };

  $scope.compare = function(){
    var communities_to_compare = _.map($scope.compare_communities, function(ranked_community){
      return ranked_community.community_profile.name;
    });
    $location.path( "/compare/" + communities_to_compare.sort());
  };
});
