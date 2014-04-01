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

  describe('#_income_similarity', function(){
    it('returns 0 if community income is absent', function(){
      data.income_data = {};
      expect(community_profile._income_similarity(100)).toEqual(0);
    });
    it('returns 0 if user income is absent', function(){
      expect(community_profile._income_similarity(null)).toEqual(0);
    });
    it('returns 100 if user income is same as community income', function(){
      spyOn(community_profile, 'income').and.returnValue(100);
      expect(community_profile._income_similarity(100)).toEqual(100);
    });
    it('returns 80 if user income is 80% as community income', function(){
      spyOn(community_profile, 'income').and.returnValue(100);
      expect(community_profile._income_similarity(80)).toEqual(80);
    });
    it('returns 80 if user income is 120% as community income', function(){
      spyOn(community_profile, 'income').and.returnValue(100);
      expect(community_profile._income_similarity(120)).toEqual(80);
    });
  });

  describe('#_sector_similarity', function(){
    it('returns 0 unless in the same sector', function(){
      expect(community_profile._sector_similarity('WEST')).toEqual(0);
    });
    it('returns 0 unless there is a preferred sector', function(){
      expect(community_profile._sector_similarity(null)).toEqual(0);
    });

    it('returns 100 unless if preferred sector matched', function(){
      expect(community_profile._sector_similarity(['EAST', 'WEST'])).toEqual(100);
    });

  });

  describe('#_crimes_score', function(){
    it('returns 100 if no crime records', function(){
      data.crimes_data = {};
      expect(community_profile._crimes_score()).toEqual(100);
    });

    it('50 crimes with a population of 100 should score 75', function(){
      data.crimes_data = {'AB': {year_2013: 50}};
      data.population_data = {'AB': {'2011': {'population': '100'}}};
      expect(community_profile._crimes_score()).toEqual(75);
    });

    it('100 crimes with a population of 100 should score 50', function(){
      data.crimes_data = {'AB': {year_2013: 100}};
      data.population_data = {'AB': {'2011': {'population': '100'}}};
      expect(community_profile._crimes_score()).toEqual(50);
    });

    it('10 crimes with a population of 100 should score 95', function(){
      data.crimes_data = {'AB': {year_2013: 10}};
      data.population_data = {'AB': {'2011': {'population': '100'}}};
      expect(community_profile._crimes_score()).toEqual(95);
    });
  });

  describe('#_family_score', function(){
    it('returns 0 if no family type given', function(){
      expect(community_profile._family_score(null)).toEqual(0);
    });

    it('returns 100 if family type is children and community has 35% under 20', function(){
      spyOn(community_profile, 'age_distribution_percentage').and.returnValue({
        under_20: 35,
        under_65: 50,
        over_65: 15
      })
      expect(community_profile._family_score('children')).toEqual(100);
    });

    it('returns  80 if family type is children and community has 14% under 20', function(){
      spyOn(community_profile, 'age_distribution_percentage').and.returnValue({
        under_20: 15,
        under_65: 60,
        over_65: 15
      })
      expect(community_profile._family_score('children')).toEqual(80);
    });

    it('returns 100 if family type is adults and community has 80% under 65', function(){
      spyOn(community_profile, 'age_distribution_percentage').and.returnValue({
        under_20: 15,
        under_65: 80,
        over_65: 5
      })
      expect(community_profile._family_score('adults')).toEqual(100);
    });

    it('returns  80 if family type is adults and community has 60% under 65', function(){
      spyOn(community_profile, 'age_distribution_percentage').and.returnValue({
        under_20: 25,
        under_65: 60,
        over_65: 15
      })
      expect(community_profile._family_score('adults')).toEqual(80);
    });

    it('returns 100 if family type is over_65 and community has 30% over 20', function(){
      spyOn(community_profile, 'age_distribution_percentage').and.returnValue({
        under_20: 30,
        under_65: 40,
        over_65: 30
      })
      expect(community_profile._family_score('retired')).toEqual(100);
    });

    it('returns 90 if family type is adults and community has 40% over 65', function(){
      spyOn(community_profile, 'age_distribution_percentage').and.returnValue({
        under_20: 20,
        under_65: 40,
        over_65: 40
      })
      expect(community_profile._family_score('retired')).toEqual(90);
    });
  });


  describe('#_avenue_score', function(){
    it('returns 0 unless in top 50', function(){
      data.avenue_ranks = {}
      expect(community_profile._avenue_score()).toEqual(0);
    });

    it('returns 9.9 if top', function(){
      expect(community_profile._avenue_score()).toEqual(9.9);
    });
    it('returns 9 if rank = 10', function(){
      expect(community_profile._avenue_score()).toEqual(9.9);
    });
    it('returns 5 if rank = 50', function(){
      expect(community_profile._avenue_score()).toEqual(9.9);
    });
  });

});