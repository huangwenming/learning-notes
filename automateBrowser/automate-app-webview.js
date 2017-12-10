let chrome = require('selenium-webdriver/chrome');
let {Builder, By, until} = require('selenium-webdriver');
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options()
        .androidPackage('com.baidu.BaiduMap')
        .androidActivity('com.baidu.baidumaps.WelcomeScreen'))
    .build();