describe('UserProfile', function(){
  var user_profile;

  beforeEach(function(){
    user_profile = new UserProfile({income: 50000});
  });

  it('extends the object with the given object', function(){
    expect(user_profile.income).toBe(50000);
  });

  describe('#preferred_sectors', function(){
    it('returns blank', function(){
      expect(user_profile.preferred_sectors()).toEqual([]);
    });

    it('returns the selected sectors', function(){
      user_profile.sectors = [{name: 'AB', selected: true},
      {name: 'BC', selected: true},
      {name: 'CD', selected: false},
      ]
      expect(user_profile.preferred_sectors()).toEqual(['AB', 'BC']);
    });
  });

  describe('#rankedCommunities', function(){
    it('returns the top n communitities', function(){
      var scores = [100, 90, 140];
      var index = 0;
      spyOn(CommunityProfile.prototype, 'score').and.callFake(function(){
        return {total_score: scores[index++]};
      });

      var communitities = ['AB', 'BC', 'CA'];

      var ranked = user_profile.rankedCommunities(communitities, 2);
      expect(ranked.length).toEqual(2);

      expect(ranked[0].community_profile.name).toEqual('CA');
      expect(ranked[0].score.total_score).toEqual(140);

      expect(ranked[1].community_profile.name).toEqual('AB');
      expect(ranked[1].score.total_score).toEqual(100);
    });
  });

});