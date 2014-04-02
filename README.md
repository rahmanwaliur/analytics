Live Site
=========
http://loveyyc.info


Setup
=====


```
open spec/unit/index.html

npm install
webdriver-manager update

ruby server.rb $2>1
webdriver-manager start $2>1

node_modules/.bin/protractor spec/e2e/conf.js

```

Techonology Used
================

* AngularJS - Client side UI framework
* Jasmine - JavaScript Unit test framework
* NodeJS - Javascript dependency through npm + end to end test
* Protractor - End to end test framework for AngularJS
* Webdriver/Selenium - A remote control tool for automating browser interaction testing
* Ruby - Used for parsing data files (xml, kml, esv, pdf)
* Github/git - Used for code repository as well as the deployed
