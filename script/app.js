var app = angular.module('community', ['ngRoute', 'angulartics', 'angulartics.google.analytics']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider.when('/compare/:communities_to_compare?', {
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
  return _.keys(population_data).sort();
});

app.factory('sectors', function(){
  return (_.uniq(_.values(sector_data))).sort();
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

app.filter('sanitize_name', function(){
  return function(names){
    return _.map(names, function(name){
      return name.replace(/\//g, '_');
    });
  };
});

app.directive('facebook', function(){
  return {
    restrict: 'E',
    templateUrl: 'facebook.html'
  }
});

app.directive('twitter', function(){
  return {
    restrict: 'E',
    templateUrl: 'twitter.html'
  }
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
        var ctaLayer = new google.maps.KmlLayer({
          url: community_profile.kml_url(),
          preserveViewport: true
        });
        ctaLayer.setMap(map);

      });
    }
  };
});

app.directive('ranks', function(){
  return{
    restrict: 'E',
    templateUrl: 'ranks_comparison.html'
  };
});

app.directive('dropdown', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      element.attr('data-toggle', 'dropdown');

      element.bind('focus', function(){
        $('#' + attrs.dropdownId).dropdown('toggle');
      })
    }
  }
});

app.directive('summary', function(){
  return {
    restrict: 'E',
    templateUrl: 'summary.html'
  }
});

app.directive('populationComparison', function(){

  return {
    restrict: 'E',
    templateUrl: 'population_comparison.html',
    controller: function($scope){
      $scope.male_chuncks = function(community_profile){
        var relativeSize = Math.ceil(community_profile.males() / $scope.population_chunk_size());
        return new Array(relativeSize);
      };

      $scope.female_chuncks = function(community_profile){
        var relativeSize = Math.ceil(community_profile.females() / $scope.population_chunk_size());
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

        chart.yAxis.tickFormat(d3.format(',d'));

        var data = _.map(scope.community_profiles, function(community_profile){

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

app.directive('ownershipComparison', function(){

  return {
    restrict: 'E',
    templateUrl: 'ownership_comparison.html',

    link: function(scope){

      var max_dwells = _.max(_.map(scope.community_profiles, function(community_profile){
        return community_profile.ownership().total;
      }));

      var chunk_size = (max_dwells > 40) ? max_dwells / 40 : max_dwells;

      scope.own_chunks = function(community_profile){
        var count = Math.ceil(community_profile.ownership().own / chunk_size);
        return new Array(count);
      };

      scope.rent_chunks = function(community_profile){
        var count = Math.ceil((community_profile.ownership().total - community_profile.ownership().own) / chunk_size);
        return new Array(count);
      }

    }

  };

});



app.controller('CompareController', function($scope, $rootScope, $route, $location, $filter, communities){
  $rootScope.tab = 'compare';

  $scope.communities = communities;
  $scope.Math = window.Math;

  var initCompare = function(){
    $scope.community_profiles = _.map($scope.communities_to_compare, function(community_name){
      return new CommunityProfile(community_name, window);
    });

    $scope.population_chunk_size = function(){
      var max_population = _.max(_.map($scope.community_profiles, function(community_profile){
        return community_profile.population(2011);
      }));

      return max_population / 50;
    };
  };

  if($route.current.params.communities_to_compare){
    $scope.communities_to_compare = $route.current.params.communities_to_compare.replace(/_/g, '/').split(',');
    initCompare();
  }
  else{
    $scope.communities_to_compare = [];
  }

  var update = function(){
    $scope.communities_to_compare = _.uniq($scope.communities_to_compare);
    var sorted_names = $filter('sanitize_name')($scope.communities_to_compare).sort()
    $location.path( "/compare/" + sorted_names);
  }

  $scope.add_community = function(community){
    $scope.communities_to_compare.push(community);
    update();
  }

  $scope.remove_community = function(community){
    $scope.communities_to_compare = _.select($scope.communities_to_compare, function(existing_community){
      return existing_community !== community;
    });
    update();
  }

});

app.controller('MatchController', function($scope, $rootScope, $filter, $location, communities, sectors){
  $rootScope.tab = 'match';
  $scope.user_profile = new UserProfile($scope);
  $scope.ranked_communities = [];
  $scope.sectors = _.map(sectors, function(sector){
    return {name: sector, selected: false};
  });;
  $scope.compare_disabled = true;

  $scope.match = function(){
    $scope.finding = true;
    $scope.button_text = 'Finding Communities..';
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

    var sanitized_names = $filter('sanitize_name')(communities_to_compare);

    $location.path( "/compare/" + sanitized_names.sort());
  };

  $scope.select_all = function(){
    _.each($scope.ranked_communities, function(ranked_community){
      ranked_community.selected = true;
    });

    $scope.compare_communities = $scope.ranked_communities;
    $scope.compare_disabled = false;
  }
});
