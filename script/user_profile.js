var UserProfile = (function(){

  function UserProfile(options){
    options = options || {};
    _.extend(this, options);
  }

  var __proto__ = UserProfile.prototype;

  __proto__.rankedCommunities = function(communities, limit){

    var _this = this;

    var community_profiles_with_scores = _.map(communities, function(community) {
      var community_profile = new CommunityProfile(community, window);
      return {community_profile: community_profile, score: community_profile.score(_this)}
    });

    var rankedByScore = _.sortBy(community_profiles_with_scores, function(community_profile_with_score){
      return -community_profile_with_score.score.total_score;
    });

    return _.first(rankedByScore, limit);
  };

  return UserProfile;
})();