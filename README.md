```
npm install
webdriver-manager update

ruby server.rb $2>1 &
webdriver-manager start $2>1 &
node_modules/.bin/protractor spec/e2e/conf.js
```

Run e2e Test
