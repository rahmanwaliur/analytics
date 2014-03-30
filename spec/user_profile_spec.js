describe('UserProfile', function(){
  var user_profile;

  beforeEach(function(){
    user_profile = new UserProfile();
  });

  it('extends the object with the given object', function(){
    expect(user_profile.income).toBe(50000);
  });

});