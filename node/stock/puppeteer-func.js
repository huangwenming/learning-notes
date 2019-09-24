const puppeteer = require('puppeteer');

let getMainFunds = async (stockCode=603305) => {
    const browser = await (puppeteer.launch({
        // 若是手动下载的chromium需要指定chromium地址,
        // 默认引用地址为 /项目目录/node_modules/puppeteer/.local-chromium/
        // executablePath: '/Users/huangwenming/hwm/home/htdocs/git/learning-notes/node/stock/node_modules/puppeteer/.local-chromium/',
        //设置超时时间
        timeout: 15000,
        //如果是访问https页面 此属性会忽略https错误
        ignoreHTTPSErrors: true,
        // 打开开发者工具, 当此值为true时, headless总为false
        devtools: false,
        // 关闭headless模式, 不会打开浏览器
        headless: true
    }));
    const page = await browser.newPage();
    await page.goto('http://data.eastmoney.com/zjlx/' + stockCode + '.html');
    await page.waitForSelector('div#content_zjlxtable table tbody tr');
    const mainFunds = await page.$$eval('div#content_zjlxtable table tbody tr',
            els => Array.from(els).map(el => {
                return {
                    // 交易日期
                    date: el.firstElementChild.querySelector('span').textContent,
                    // 主力资金净流入值
                    value: el.children[3].querySelector('span').textContent
                };
            }));
    // console.log(mainFunds);
};
module.exports = {
    getMainFunds
};
