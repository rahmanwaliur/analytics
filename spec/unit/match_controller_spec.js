describe('MatchController', function(){
  beforeEach(module('community'));

  var match_controller = null;
  var scope = null;
  var location = null;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    location = {
      path: function(){}
    }
    window.population_data = window.sector_data = {};

    match_controller = $controller('MatchController', {
      $scope: scope,
      $location: location
    });
  }));

  describe('#match', function(){
    it('matches the user profile to the most suitable communities', function(){
      var communities = [{name: 'AB'}];
      spyOn(UserProfile.prototype, 'rankedCommunities').and.returnValue(communities);

      scope.match();

      expect(scope.ranked_communities).toEqual(communities);
    });
  });

  describe('#select_community', function(){
    it('adds the communities to compare and shows the compare button', function(){
      scope.ranked_communities = [{name: 'AB', selected: true}];
      scope.select_community("AB");
      expect(scope.compare_disabled).toEqual(false);
      expect(scope.compare_communities).toEqual( [ { name : 'AB', selected : true } ]);
    });
  });

  describe('#compare', function(){
    it('shows the compare view sorted by the name', function(){
      scope.compare_communities = [{community_profile: {name: 'BC'}},
      {community_profile: {name: 'AB'}}];

      spyOn(location, 'path');
      scope.compare();
      expect(location.path).toHaveBeenCalledWith('/compare/AB,BC');
    });
  });

  describe('#select_all', function(){
    it('selects all the matched results', function(){
      scope.ranked_communities = [{selected: false}, {selected: false}];

      scope.select_all();

      expect(scope.ranked_communities).toEqual([{selected: true}, {selected: true}]);
      expect(scope.compare_communities).toEqual(scope.ranked_communities);
      expect(scope.compare_disabled).toEqual(false);
    });
  });

});