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