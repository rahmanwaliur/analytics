var population_search = function(population_data, keyword){

  var communities = _.filter(_.keys(population_data), function(community) {
    keyword = keyword || "";
    return community.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
  });

  return communities.sort();

};

window.search_results_template = Handlebars.compile($('#search-result-template').html());

var show_search_results = function(keyword, results_view){
  var communities = population_search(window.population_data, keyword);
  results_view.empty();
  $('#community').empty();

  _.each(communities, function(community){
    results_view.append(window.search_results_template({community: community}) );
  });
};

var search = function(event){
  event.preventDefault();
  var keyword = $('#search').val();
  var results_view = $('#search-results');

  show_search_results(keyword, results_view);
};

var show_community = function(event){
  var community = $(event.target).data('community');

  $('.community').html(community);

  $('#search-results').empty();
  show_population(community);
  show_employment(community);
};

window.population_template = Handlebars.compile($('#population-template').html());
var show_population = function(community){
  var community_population = window.population_data[community];

  $('#community-population').empty();

  var yearly_data = [];

  _.each(_.keys(community_population), function(year){
    var population = community_population[year].population;
    var chunks_of_population = Math.round(population / 100);
    chunks = [];
    for(var x = 0; x < chunks_of_population; x ++){
      chunks.push(1);
    };

    yearly_data.push({year: year, population_chunks: chunks, population: $.number(population)});
  });

  $('#community-population').append(window.population_template({community: community,yearly_data: yearly_data}));
};

window.employment_template = Handlebars.compile($('#employment-template').html());
var show_employment = function(community){
  var community_employment = window.employment_data[community];

  $('#community-employment').empty();

  var yearly_data = [];

  _.each(_.keys(community_employment), function(year){
    var employment = community_employment[year].employment;
    var chunks_of_employment = Math.round(employment / 100);
    chunks = [];
    for(var x = 0; x < chunks_of_employment; x ++){
      chunks.push(1);
    };

    yearly_data.push({year: year, employment_chunks: chunks, employment: $.number(employment)});
  });

  $('#community-employment').append(window.employment_template({community: community, yearly_data: yearly_data}));
};