describe('match page', function() {
  it('sets income to 15000 when user selects under 30K', function() {
    browser.get('http://localhost:8000');

    element(by.model('income')).$('option[value="15000"]').click();

    expect(element(by.selectedOption('income')).getText()).toEqual('under $30,000')
  });

  it('sets income to 45000 when user selects 30-60K', function() {
    browser.get('http://localhost:8000');

    element(by.model('income')).$('option[value="45000"]').click();

    expect(element(by.selectedOption('income')).getText()).toEqual('$30,000 - $60,000')
  });

  it('sets income to 75000 when user selects 60-90K', function() {
    browser.get('http://localhost:8000');

    element(by.model('income')).$('option[value="75000"]').click();

    expect(element(by.selectedOption('income')).getText()).toEqual('$60,000 - $90,000')
  });

  it('sets income to 105000 when user selects 90-120K', function() {
    browser.get('http://localhost:8000');

    element(by.model('income')).$('option[value="105000"]').click();

    expect(element(by.selectedOption('income')).getText()).toEqual('$90,000 - $110,000')
  });

  it('sets income to 130000 when user selects over 120K', function() {
    browser.get('http://localhost:8000');

    element(by.model('income')).$('option[value="130000"]').click();

    expect(element(by.selectedOption('income')).getText()).toEqual('Over $120,000')
  });

});