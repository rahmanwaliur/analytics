var communities = function(){
  return _.keys(population_data);
}

var population_search = function(population_data, keyword){

  var communities = _.filter(_.keys(population_data), function(community) {
    keyword = keyword || "";
    return community.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
  });

  return communities.sort();

};

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

  $(".metric").show();

  $('#community-' + community_id).html(community);

  $('#search-results-' + community_id).empty().hide();

  var communityProfile = new CommunityProfile(community, window);

  show_sector(communityProfile.sector(), community_id);
  show_map(communityProfile.kml_url(), community_id);
  show_population(communityProfile.population(), community_id);
  show_employment(communityProfile.employment(), community_id);
  show_crimes(communityProfile.crimes(), community_id);
  show_income(communityProfile.income(), community_id);
};

var show_sector = function(sector, community_id){
  $('#community-sector-' + community_id).html(sector);
};

var show_population = function(community_population, community_id){
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

  population_container.append(window.population_template({community: community_population,yearly_data: yearly_data}));
};

var show_employment = function(community_employment, community_id){
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

  employment_container.append(window.employment_template({yearly_data: yearly_data}));
};

var show_income = function(community_income, community_id){
  var income_container =$('#community-income-' + community_id);
  var income_formatted = {};

  _.each(community_income, function(income, year){
    income_formatted[year] = $.number(income, 0);
  });
  income_container.empty().append(window.income_template({income: income_formatted}));
};