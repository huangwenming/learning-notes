let chrome = require('selenium-webdriver/chrome');
let {Builder, By, until, WebElementCondition} = require('selenium-webdriver');
let driver = new Builder()
    .forBrowser('chrome')
    .build();
const waitFind = (locator, waitTime=5000) => {
    return driver.findElement(async () => {
        await driver.wait(until.elementLocated(locator), waitTime);
        return driver.findElement(locator);
    });
};

driver.get('http://meeting.baidu.com/index.html#/home');
// uuap登录
waitFind(By.name('username')).sendKeys('')
waitFind(By.name('password')).sendKeys('')
waitFind(By.id('emailLogin')).click();
// 关闭新人提示
waitFind(By.className('el-dialog__headerbtn')).click();

// 等到新人提示弹窗关闭后，选择下周会议室
const days = ['下周天', '下周一', '下周二', '下周三', '下周四', '下周五', '下周六'];
const currentDate = new Date().getDay();
const orderDay = days[currentDate];

setTimeout(()=> {
    waitFind(By.css('.header-bar .item:nth-of-type(9) span')).click();
    // 选择抢南宫会议室
    waitFind(By.css('.time-box .time-list:nth-of-type(7) .use')).click();
    // 执行预定
    waitFind(By.css('.reserver-active .reserver-box .btn-book:nth-of-type(3)')).click();
}, 5000);

