describe('CommunityProfile', function(){

  var community_profile = null;
  var data = null;
  beforeEach(function(){
    data = {
      sector_data: {
        'AB': 'EAST',
        'BC': 'WEST'
      },
      population_data: {
        'AB': {
          '2009': {population: '3000'},
          '2011': {population: '3012'}
        }
      },
      employment_data: {
        'AB': {'2009': {employment: '1302'}}
      },
      income_data: {
        'AB': {'year_2005': 78000.3}
      },
      crimes_data: {
        'AB': {year_2013: 43}
      },
      kml_data: {
        'AB': 'ABBB'
      },
      ownership_data: {
        'AB': {total: 500, own: 400}
      },
      age_data: {
        'AB': {
          MF_0_4: 3,
          MF_5_14: 3,
          MF_15_19: 4,
          MF_20_24: 20,
          MF_25_34: 20,
          MF_35_44: 10,
          MF_45_54: 10,
          MF_55_64: 10,
          MF_65_74: 5,
          MF_75: 15
        }
      },
      avenue_ranks: {
        'AB': 1
      }
    };
    community_profile = new CommunityProfile("AB", data);
  });

  it('sets the name and data source', function(){
    expect(community_profile.name).toEqual('AB');
    expect(community_profile.data).toEqual(data);
  });


  it('retruns the sector name from the datasource', function(){
    expect(community_profile.sector()).toEqual('EAST');
  });

  it('retruns the population from the datasource', function(){
    expect(community_profile.population(2009)).toEqual(3000);
    expect(community_profile.population(2011)).toEqual(3012);
  });

  it('retruns the employment data from the datasource', function(){
    expect(community_profile.employment(2009)).toEqual(1302);
  });

  it('retruns the employment percentage', function(){
    expect(community_profile.employment_percentage(2009)).toEqual(43.4);
  });

  it('returns the income', function(){
    expect(community_profile.income(2005)).toEqual(78000.3);
  });

  it('returns the crimes', function(){
    expect(community_profile.crimes(2013)).toEqual(43);
  });

  it('returns the kml_url', function(){
    expect(community_profile.kml_url()).toEqual('http://smsohan.com/analytics/data/kmls/ABBB.kml');
  });

  it('returns the ownership_percent', function(){
    expect(community_profile.ownership_percent()).toEqual(80);
  });

  it('returns the age_distribution_percentage', function(){
    community_profile.data.population_data['AB']['2011']['population'] = '100';
    expect(community_profile.age_distribution_percentage()).toEqual({
      under_20: 10,
      under_65: 70,
      over_65: 20
    });
  });

  it('returns the has_max_distribution_percentage', function(){
    community_profile.data.population_data['AB']['2011']['population'] = '100';
    expect(community_profile.has_max_distribution_percentage('under_65')).toBeTruthy();
    expect(community_profile.has_max_distribution_percentage('under_20')).toBeFalsy();
    expect(community_profile.has_max_distribution_percentage('over_65')).toBeFalsy();
  });

  it('computes the score combining income, crimes, sector, family and avenue calgary', function(){
    var user_profile = new UserProfile({
      income: 75000,
      family_type: 'children',

      preferred_sectors: function(){
        return "EAST";
      }
    })
    expect(Math.round(community_profile.score(user_profile).total_score)).toEqual(271);
  });


});