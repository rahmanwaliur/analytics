var MatchPage = (function(){

  var MatchPage = function(){

    this.get = function(){
      browser.get('http://localhost:8000');
    }

    this.selected_income = function(){
      return element(by.selectedOption('income')).getText();
    }

    this.select_income = function(value){
      element(by.model('income')).$('option[value="' + value + '"]').click();
    }

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


});