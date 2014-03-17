var CommunityProfile = (function() {

  function CommunityProfile(name, data) {
    this.name = name;
    this.data = data;
  }

  var __proto__ = CommunityProfile.prototype;

  __proto__.sector = function() {return this.data.sector_data[this.name];}
  __proto__.population = function() {return this.data.population_data[this.name];}
  __proto__.employment = function() {return this.data.employment_data[this.name];}
  __proto__.income = function() {return this.data.income_data[this.name];}
  __proto__.crimes = function() {return this.data.crimes_data[this.name];}
  __proto__.kml_url = function() {return 'http://smsohan.com/analytics/data/kmls/' + this.data.kml_data[this.name] + ".kml";}


  __proto__.score = function(user_profile){
    var income_score = this._income_similarity(user_profile.income);
    var crime_score =  this._crimes_score();

    return {
      score: income_score + crime_score,
      income_score: income_score,
      crime_score: crime_score
    };
  };

  __proto__._income_similarity = function(user_income){
    if(!user_income) return 0;

    var community_income2005 = this.income().year_2005;

    return 100 - Math.abs( community_income2005 - user_income) * 100.0 / community_income2005;
  }

  __proto__._crimes_score = function(){
    var latestCrimes = this.crimes().year_2013;
    var latestPopulation = parseInt(this.population()[2011].population, 10);

    var crimesPerPerson = latestCrimes / latestPopulation;
    return 100 - crimesPerPerson;
  };

  return CommunityProfile;

})();