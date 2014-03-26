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

app.directive('map', function(){
  return{
    restrict: 'E',
    templateUrl: 'map.html',
    link: function(scope, element){

      var calgary = new google.maps.LatLng(51.0500,-114.0667);
      var mapOptions = {
        zoom: 11,
        center: calgary
      }

      var map = new google.maps.Map($('#map-container', element[0])[0], mapOptions);

      _.each(scope.community_profiles, function(community_profile){
        console.dir(community_profile.kml_url())

        var ctaLayer = new google.maps.KmlLayer({
          url: community_profile.kml_url(),
          preserveViewport: true
        });
        ctaLayer.setMap(map);

      });
    }
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

app.directive('incomeComparison', function(){

  return {
    restrict: 'E',
    templateUrl: 'income_comparison.html',

    link: function(scope, element){
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
        .transitionDuration(350)
        .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0)      //Angle to rotate x-axis labels.
        .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(0.2)    //Distance between each group of bars.
        ;

        chart.yAxis.tickFormat(d3.format('$,d'));

        var data = _.map(scope.community_profiles, function(community_profile){
          return {
            key: community_profile.name,
            values: [
              {x: 2000, y: community_profile.income(2000)},
              {x: 2005, y: community_profile.income(2005)}
            ]
          }
        });

        d3.select(element[0]).select('svg')
            .datum(data)
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
      });
    }

  }

});

app.directive('crimesComparison', function(){

  return {
    restrict: 'E',
    templateUrl: 'crimes_comparison.html',

    link: function(scope, element){
      nv.addGraph(function() {
        var chart = nv.models.multiBarChart()
        .transitionDuration(350)
        .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
        .rotateLabels(0)      //Angle to rotate x-axis labels.
        .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
        .groupSpacing(0.2)    //Distance between each group of bars.
        ;

        chart.yAxis.tickFormat(d3.format('$,d'));

        var data = _.map(scope.community_profiles, function(community_profile){
          console.log(community_profile.crimes(2012));

          return {
            key: community_profile.name,
            values: [
              {x: 2012, y: community_profile.crimes(2012)},
              {x: 2013, y: community_profile.crimes(2013)}
            ]
          }
        });

        d3.select(element[0]).select('svg')
            .datum(data)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
      });
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
