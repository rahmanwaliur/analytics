var population_search = function(population_data, keyword){

  var communities = _.filter(_.keys(population_data), function(community) {
    keyword = keyword || "";
    return community.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
  });

  return communities.sort();

};

window.search_results_template = Handlebars.compile($('#search-result-template').html());

var show_search_results = function(keyword, results_view, community_id){
  var communities = population_search(window.population_data, keyword);
  results_view.empty();
  $('#community').empty();

  _.each(communities, function(community){
    results_view.append(window.search_results_template({community: community, community_id: community_id}) );
  });

  results_view.show().dropdown("toggle");
  results_view.find('.community-link').on("click", show_community);
};

var search = function(event){
  event.preventDefault();
  var keyword = $(event.target).val();
  var community_id = $(event.target).data("community");

  var results_view = $('#search-results-' + community_id);

  show_search_results(keyword, results_view, community_id);
};

var show_community = function(event){
  var community = $(event.target).data('community');
  var community_id = $(event.target).data('community-id');

  $('#community-' + community_id).html(community);

  $('#search-results-' + community_id).empty().hide();

  show_sector(community, community_id);
  show_population(community, community_id);
  show_employment(community, community_id);
};

var show_sector = function(community, community_id){
  $('#community-sector-' + community_id).html(window.sector_data[community]);
};

window.population_template = Handlebars.compile($('#population-template').html());
var show_population = function(community, community_id){
  var community_population = window.population_data[community];

  var population_container =$('#community-population-' + community_id);

  population_container.empty();

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

  population_container.append(window.population_template({community: community,yearly_data: yearly_data}));
};

window.employment_template = Handlebars.compile($('#employment-template').html());
var show_employment = function(community, community_id){
  var community_employment = window.employment_data[community];

  var employment_container =$('#community-employment-' + community_id);

  employment_container.empty();

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

  employment_container.append(window.employment_template({community: community, yearly_data: yearly_data}));
};