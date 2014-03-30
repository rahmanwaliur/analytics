describe('match page', function() {
  it('asks for the user profile', function() {
    browser.get('http://localhost:8000');

    element(by.model('income')).$('option[value="75000"]').click();

    expect(element(by.selectedOption('income')).getText()).toEqual('$60,000 - $90,000')
  });
});