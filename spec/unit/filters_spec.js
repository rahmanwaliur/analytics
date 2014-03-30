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

describe('sanitize_name', function(){
  beforeEach(module('community'));

  it('returns blank if input is blank', inject(function(sanitize_nameFilter){
    expect(sanitize_nameFilter([])).toEqual([]);
  }));

  it('returns sanitized if contains "/"', inject(function(sanitize_nameFilter){
    expect(sanitize_nameFilter(['AB/CD'])).toEqual(['AB_CD']);
  }));

  it('returns original if doesnt contain "/"', inject(function(sanitize_nameFilter){
    expect(sanitize_nameFilter(['AB CD'])).toEqual(['AB CD']);
  }));


});