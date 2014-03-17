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

  return CommunityProfile;

})();