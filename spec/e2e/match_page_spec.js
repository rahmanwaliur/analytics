var ptor = protractor.getInstance();

var MatchPage = (function(){

  var MatchPage = function(){

    var select_option = function(model, value){
      element(by.model(model)).$('option[value="' + value + '"]').click();
    };

    var selected_option = function(model, value){
      return element(by.selectedOption(model)).getText();
    };

    this.get = function(){
      browser.get('http://localhost:8000');
    };

    this.selected_income = function(){
      return selected_option('income');
    };

    this.select_income = function(value){
      select_option('income', value);
    };

    this.select_family_type = function(value){
      select_option('family_type', value);
    };

    this.selected_family_type = function(value){
      return selected_option('family_type');
    };

    this.select_sector = function(sector){
      $('.sector[value="' + sector + '"]').click();
    };

    this.click_button = function(partial_text){
      return element(by.partialButtonText(partial_text)).click();
    };

    this.select_all = function(){
      $('.select-all').click();
    };

  };

  return MatchPage;
})();


describe('match page', function() {

  var match_page = null;

  beforeEach(function(){
    match_page = new MatchPage();
    match_page.get();
  });

  describe('income select', function(){

    it('sets income to 15000 when user selects under 30K', function() {
      match_page.select_income(15000);
      expect(match_page.selected_income()).toEqual('Less than $30,000');
    });

    it('sets income to 45000 when user selects 30-60K', function() {
      match_page.select_income(45000);
      expect(match_page.selected_income()).toEqual('$30,000 - $60,000');
    });

    it('sets income to 75000 when user selects 60-90K', function() {
      match_page.select_income(75000);
      expect(match_page.selected_income()).toEqual('$60,000 - $90,000');
    });

    it('sets income to 105000 when user selects 90-120K', function() {
      match_page.select_income(105000);
      expect(match_page.selected_income()).toEqual('$90,000 - $120,000');
    });

    it('sets income to 130000 when user selects over 120K', function() {
      match_page.select_income(130000);
      expect(match_page.selected_income()).toEqual('Above $120,000');
    });

  });

  describe('family select', function(){
    it('sets retired', function() {
      match_page.select_family_type('retired');
      expect(match_page.selected_family_type()).toEqual('Retired');
    });

    it('sets adults', function() {
      match_page.select_family_type('adults');
      expect(match_page.selected_family_type()).toEqual('Adults only');
    });

    it('sets adults with children', function() {
      match_page.select_family_type('children');
      expect(match_page.selected_family_type()).toEqual('Adults with Children');
    });

  });

  describe('active tab', function(){
    it('sets the match as an active tab', function(){
      expect($('.nav .active a').getText()).toEqual('Match');
    });
  });

  describe('routes', function(){
    it('renders the Match tab if url has #!/match', function(){
      browser.get('http://localhost:8000/#!/match');
      expect($('.nav .active a').getText()).toEqual('Match');

    });
  });

  describe('sector select', function(){
    it('selects CENTER', function(){
      match_page.select_sector('CENTRE');
      match_page.click_button('Find');

      ptor.sleep(5000);
      match_page.select_all();
      ptor.sleep(2000);
      match_page.click_button('Compare');

      expect(browser.getCurrentUrl()).toContain('#!/compare');
    });
  });

});