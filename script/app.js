var app = angular.module('community', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider.when('/compare:communities_to_compare?', {
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
    if(!input || input.length === 0){
      return "";
    }

    if(input.length === 1){
      return input[0];
    }

    var length = input.length;
    return _.take(input, length - 1).join(', ') + ' and ' + input[input.length -1];
  };

});

app.directive('populationComparison', function(){

  return {
    restrict: 'E',
    templateUrl: 'population_comparison.html',

    controller: function($scope){
      $scope.population_chuncks = function(community_profile){
        var relativeSize = Math.ceil(community_profile.population(2011) / $scope.population_chunk_size());
        return new Array(relativeSize);
      };
    }

  }

});

app.directive('employmentComparison', function(){

  return {
    restrict: 'E',
    templateUrl: 'employment_comparison.html',

    controller: function($scope){
      $scope.employment_chuncks = function(community_profile){
        var relativeSize = Math.ceil(community_profile.employment(2011) / $scope.population_chunk_size());
        return new Array(relativeSize);
      };
    }

  }

});


app.controller('CompareController', function($scope, $rootScope, $route){
  $rootScope.tab = 'compare';

  $scope.communities_to_compare = $route.current.params.communities_to_compare.split(',');
  $scope.community_profiles = _.map($scope.communities_to_compare, function(community_name){
    return new CommunityProfile(community_name, window);
  });

  $scope.population_chunk_size = function(){
    var max_population = _.max(_.map($scope.community_profiles, function(community_profile){
      return community_profile.population(2011);
    }));

    return max_population / 50;
  };

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
    $location.path( "/compare" + communities_to_compare.sort());
  };
});
