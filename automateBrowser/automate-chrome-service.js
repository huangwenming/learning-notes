let chrome = require('selenium-webdriver/chrome');
let {Builder, By, until} = require('selenium-webdriver');
let service = new chrome.ServiceBuilder()
    .loggingTo('./log/file.txt')
    .enableVerboseLogging()
    .build();
let options = new chrome.Options();
let driver = chrome.Driver.createSession(options, service);
driver.get('https://www.baidu.com');
driver.findElement(By.id('kw')).sendKeys('webdriver');
driver.findElement(By.id('su')).click();
driver.wait(until.titleIs('webdriver_百度搜索'), 5000);

