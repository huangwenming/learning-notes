let chrome = require('selenium-webdriver/chrome');
let {Builder, By, until} = require('selenium-webdriver');
let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().androidChrome())
    .build();

driver.get('https://www.baidu.com');
driver.findElement(By.name('word')).sendKeys('webdriver');
driver.findElement(By.name('word')).submit();
driver.quit();

