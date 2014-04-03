describe('communities', function(){
 beforeEach(module('community'));

 beforeEach(function(){
   window.population_data = {'BC': {}, 'CA': {}, 'AB': {}, '01B': {}};
 });

 it('shows the communities sorted by name and leaves the ones starting with a number', inject(function(communities){
   expect(communities).toEqual(['AB', 'BC', 'CA']);
 }));

});
