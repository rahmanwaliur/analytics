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

  show_sector(window.sector_data[community], community_id);
  show_map(community, community_id);
  show_population(community, community_id);
  show_employment(community, community_id);
  show_crimes(community, community_id);
  show_income(community, community_id);
};

var show_sector = function(sector, community_id){
  $('#community-sector-' + community_id).html(sector);
};

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

var show_income = function(community, community_id){
  var community_income = window.income_data[community];

  var income_container =$('#community-income-' + community_id);
  var income_formatted = {};

  _.each(community_income, function(income, year){
    income_formatted[year] = $.number(income, 0);
  });
  income_container.empty().append(window.income_template({community: community, income: income_formatted}));
};