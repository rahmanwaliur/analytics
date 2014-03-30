describe("population_search", function() {
  var population_data = null;

  beforeEach(function(){
   population_data = {
      "VARSITY": {
        "2009": {
          "population": "100"
        }
      },

      "RENFREW": {
        "2009": {
          "population": "5698"
        }
      }
    };
  });

  it("finds the population by keyword", function() {

    var result = population_search(population_data, "Var");

    expect(result).toEqual(['VARSITY']);

  });

  it('returns nothing if no community found', function(){
    var result = population_search(population_data, "GAGA");

    expect(result).toEqual([]);
  })

  it('returns everything when no keyword given', function(){
    var result = population_search(population_data, "");

    expect(result).toEqual(['RENFREW', 'VARSITY']);
  })

});

describe("show_sector", function() {
  beforeEach(function(){
    $('body').append('<div id="community-sector-1"></div>');
  });
  afterEach(function(){
    $('#community-sector-1').remove();
  });

  it('shows the city sector for the selected community', function(){
    show_sector("NW", 1);
    expect($('#community-sector-1').html()).toEqual("NW");
  });
});