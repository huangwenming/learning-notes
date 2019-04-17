from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction
import time

server = 'http://localhost:4723/wd/hub'
desired_caps = {
    "platformName": "ios",
    "deviceName": "iPhone (2)",
    "platformVersion": "12.2",
    "bundleId": "com.ss.iphone.ugc.Aweme",
    "udid": "9a1f1fa0fe63b0cb49f36268c158b7ce06f0df9a"
}
#不清除用户缓存
desired_caps['noReset'] = True
driver = webdriver.Remote(server, desired_caps)
wait = WebDriverWait(driver, 30)

#点击我知道了
time.sleep(3)
driver.tap([(375, 946)], 100)
time.sleep(1)
#点击我
driver.tap([(676, 1258)], 100)
time.sleep(1)
#点击关注
driver.tap([(375, 1000), (375, 1215), (375, 1315)], 100)


#滚动列表页
driver.swipe(100, 200, 100, 50, 300)

