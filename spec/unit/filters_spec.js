describe('join', function(){
  beforeEach(module('community'));

  it('returns blank if input is nil or blank', inject(function(joinFilter){
    expect(joinFilter(null)).toEqual('');
    expect(joinFilter(undefined)).toEqual('');
    expect(joinFilter([])).toEqual('');
  }));

  it('returns the item single item array', inject(function(joinFilter){
    expect(joinFilter(['gaga'])).toEqual('gaga');
  }));

  it('returns the items combined by commas and and', inject(function(joinFilter){
    expect(joinFilter(['gaga', 'gugu', 'gigi'])).toEqual('gaga, gugu and gigi');
  }));

});