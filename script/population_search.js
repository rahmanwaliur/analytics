var population_search = function(keyword){

  var communities = _.filter(_.keys(window.population_data), function(community) {
    return community.indexOf(keyword) >= 0;
  });

  return communities;

};

window.search_results_template = Handlebars.compile($('#search-result-template').html());

var show_search_results = function(keyword, results_view){
  var communities = population_search(keyword);
  results_view.empty();
  $('#community-population').empty();

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

window.population_template = Handlebars.compile($('#population-template').html());
var show_community = function(event){
  var community = $(event.target).data('community');
  var community_population = window.population_data[community];

  $('#search-results').empty();
  $('#community-population').empty();

  var yearly_data = [];

  _.each(_.keys(community_population), function(year){
    yearly_data.push({year: year, population: community_population[year].population});
  });

  $('#community-population').append(window.population_template({community: community,yearly_data: yearly_data}));

};