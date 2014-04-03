describe('communities', function(){
 beforeEach(module('community'));

 beforeEach(function(){
   window.population_data = {'BC': {}, 'CA': {}, 'AB': {}};
 });

 it('shows the communities sorted by name', inject(function(communities){
   expect(communities).toEqual(['AB', 'BC', 'CA']);
 }));
});
