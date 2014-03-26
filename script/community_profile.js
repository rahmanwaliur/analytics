var CommunityProfile = (function() {

  function CommunityProfile(name, data) {
    this.name = name;
    this.data = data;
  }

  var __proto__ = CommunityProfile.prototype;

  __proto__.sector = function() {return this.data.sector_data[this.name];}
  __proto__.population = function(year) {
    if(this.data.population_data[this.name]['' + year]){
      return parseInt(this.data.population_data[this.name]['' + year].population, 10);
    }
    return NaN;
  }

  __proto__.employment = function(year) {
    return parseInt(this.data.employment_data[this.name]['' + year]['employment'], 10);
  }

  __proto__.employment_precentage = function(year) {
    return this.employment(year) / this.population(year) * 100;
  }

  __proto__.income = function(year) {
    if(this.data.income_data[this.name]){
      return this.data.income_data[this.name]['year_' + year];
    };

    return 0;
  }
  __proto__.crimes = function(year) {
    if(this.data.crimes_data[this.name]){
      return this.data.crimes_data[this.name]['year_' + year];
    }
    return 0;
  }
  __proto__.kml_url = function() {return 'http://smsohan.com/analytics/data/kmls/' + this.data.kml_data[this.name] + ".kml";}


  __proto__.score = function(user_profile){
    var income_score = this._income_similarity(user_profile.income);
    var crime_score =  this._crimes_score();
    var sector_score = this._sector_similarity(user_profile.preferred_sectors);

    return {
      total_score: income_score + crime_score + sector_score,
      income_score: income_score,
      crime_score: crime_score,
      sector_score: sector_score
    };
  };

  __proto__._income_similarity = function(user_income){
    if(!user_income || !this.income() || this.income() === 0) return 0;

    var community_income2005 = this.income().year_2005;

    return 100 - Math.abs( community_income2005 - user_income) * 100.0 / community_income2005;
  };

  __proto__._sector_similarity = function(user_preferred_sectors){
    if(!user_preferred_sectors || user_preferred_sectors.length === 0) return 0;

    return _.contains(user_preferred_sectors, this.sector()) ? 100 : 0;
  };

  __proto__._crimes_score = function(){
    if(!this.crimes(2013) || this.crimes(2013).year_2013 === 0) return 100;

    var latestCrimes = this.crimes(2013).year_2013;
    var latestPopulation = this.population(2011);

    var crimesPerPerson = latestCrimes / latestPopulation;
    return 100 - crimesPerPerson;
  };

  return CommunityProfile;

})();