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
    return 0;
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


  __proto__.ownership = function() {return this.data.ownership_data[this.name];}
  __proto__.ownership_percent = function() {return this.ownership().own / this.ownership().total * 100;}

  __proto__.age_distribution = function(){ return this.data.age_data[this.name];}

  __proto__.age_distribution_percentage = function(){
    var total = this.population(2011);
    var distribution = this.age_distribution();

    return {
      under_20: (distribution.MF_0_4 + distribution.MF_5_14 + distribution.MF_15_19) / total * 100,
      under_65: (distribution.MF_20_24 + distribution.MF_25_34 + distribution.MF_35_44 + distribution.MF_45_54 + distribution.MF_55_64) / total * 100,
      over_65: (distribution.MF_65_74 + distribution.MF_75) / total * 100
    };

  };

  __proto__.age_distribution_max = function(){
    var max_group = null;
    var max_percentage = 0;

    _.each(this.age_distribution_percentage(), function(percentage, key){
      if(max_percentage < percentage){
        max_group = key;
        max_percentage = percentage;
      }
    })

    return max_group;
  };

  __proto__.has_max_distribution_percentage = function(age_group){
    return this.age_distribution_max() === age_group;
  };


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

    if(!latestCrimes) return 100;

    console.log("latestCrimes / latestPopulation;" + latestCrimes + " " + latestPopulation);

    var crimesPerPerson = latestCrimes / latestPopulation;
    return 100 - crimesPerPerson;
  };

  __proto__.males = function(){
    return this.data.genders[this.name]['MALE'];
  };

  __proto__.females = function(){
    return this.data.genders[this.name]['FEMALE'];
  };

  __proto__.female_percentage = function(){
    return this.females() / this.population(2011) * 100;
  };

  __proto__.population_growth = function(){
    return this.population(2011) - this.population(2009);
  }

  __proto__.is_population_growing = function(){
    return this.population_growth() > 0;
  }

  __proto__.avenue_rank = function(){
    return this.data.avenue_ranks[this.name];
  };

  return CommunityProfile;

})();