var ptor = protractor.getInstance();

var ComparePage = (function(){

  var ComparePage = function(){

    this.get = function(suffix){
      suffix = suffix || '';
      browser.get('http://localhost:8000/#!/compare' + suffix);
    };

    this.text = function(){
      return $('body').getText();
    }

  };

  return ComparePage;
})();

describe('Compare Page', function(){
  var compare_page = null;

  beforeEach(function(){
    compare_page = new ComparePage();
  });

  describe('active tab', function(){
    it('sets compare as the active tab', function(){
      compare_page.get();
      expect($('.nav .active a').getText()).toEqual('Compare');
    });

  });

  describe('routes', function(){
    it('renders blank when no community selected', function(){
      compare_page.get();
      expect(compare_page.text()).not.toContain('Comparing')
    });

    it('parses comma separated list of communities', function(){
      compare_page.get('/ARBOUR%20LAKE,CITADEL');
      expect(compare_page.text()).toContain('Comparing ARBOUR LAKE and CITADEL')
    });

  });

  describe('sections', function(){
    it('renders the sections for the selection communities', function(){
      compare_page.get('/BRENTWOOD,UNIVERSITY%20OF%20CALGARY');
      var pageText = compare_page.text();
      expect(pageText).toContain('MAP');
      expect(pageText).toContain('AVENUE CALGARY RANKING');
      expect(pageText).toContain('POPULATION');
      expect(pageText).toContain('POPULATION GROWTH');
      expect(pageText).toContain('EMPLOYMENT');
      expect(pageText).toContain('INCOME');
      expect(pageText).toContain('OWNERS VS. RENTERS');
      expect(pageText).toContain('CRIME REPORTS');
      expect(pageText).toContain('SUMMARY');
    });
  });

  describe('search', function(){
    it('searches for a community by its name and allows user to add it the comparison', function(){
      compare_page.get('/BRENTWOOD,UNIVERSITY%20OF%20CALGARY');

      element(by.model("community_to_add")).sendKeys("BANFF");
      element.all(by.css('#matching_communities a')).then(function(matches) {
        expect(matches.length).toEqual(1);
      });

      $('#matching_communities a').click();

      expect(browser.getCurrentUrl()).toContain('#!/compare/BANFF%20TRAIL,BRENTWOOD,UNIVERSITY%20OF%20CALGARY');
    });

    it('searches for a community by its name and shows all that match', function(){
      compare_page.get();

      element(by.model("community_to_add")).sendKeys("VISTA");

      element.all(by.css('#matching_communities a')).then(function(matches) {
        expect(matches.length).toEqual(4);
        expect(matches[0].getText()).toEqual('BONAVISTA DOWNS');
        expect(matches[1].getText()).toEqual('LAKE BONAVISTA');
        expect(matches[2].getText()).toEqual('ROYAL VISTA');
        expect(matches[3].getText()).toEqual('VISTA HEIGHTS');
      });
    });
  });


});