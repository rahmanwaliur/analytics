describe('CompareController', function(){
  beforeEach(module('community'));

  var compare_controller = null;
  var scope = null;
  var location = null;
  var route = null;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    location = {
      path: function(){}
    }
    route = {
      current: {
        params: {communities_to_compare: 'AB,BC'}
      }
    }

    window.population_data = window.sector_data = {};

    compare_controller = $controller('CompareController', {
      $scope: scope,
      $location: location,
      $route: route
    });
  }));

  it('sets the communities_to_compare from the URL', function(){
    expect(scope.communities_to_compare).toEqual(['AB', 'BC']);
  });

  describe('#add_community', function(){
    it('adds a community to compare', function(){
      spyOn(location, 'path');

      scope.add_community('CA');

      expect(scope.communities_to_compare).toEqual(['AB', 'BC', 'CA']);

      expect(location.path).toHaveBeenCalledWith('/compare/AB,BC,CA');
    });
  });

  describe('#remove_community', function(){
    it('removes the community from the comparison', function(){
      spyOn(location, 'path');

      scope.remove_community('AB');

      expect(scope.communities_to_compare).toEqual(['BC']);

      expect(location.path).toHaveBeenCalledWith('/compare/BC');
    });
  });

});