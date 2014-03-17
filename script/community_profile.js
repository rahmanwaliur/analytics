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
    return this._incomeSimilarity(user_profile.income);
  };

  __proto__._incomeSimilarity = function(user_income){
    if(!user_income) return 0;

    var communityIncome2005 = this.income().year_2005;

    return 100 - Math.abs( communityIncome2005 - user_income) * 100.0 / communityIncome2005;
  }

  return CommunityProfile;

})();