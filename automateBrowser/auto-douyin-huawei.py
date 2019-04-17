from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction
import time

server = 'http://localhost:4723/wd/hub'
desired_caps = {
    "deviceName": "FRD_AL00",
    "platformName": "Android",
    "appPackage": "com.ss.android.ugc.aweme",
    "appActivity": "com.ss.android.ugc.aweme.splash.SplashActivity",
    #不清除用户缓存
    "noReset": "True"
}
driver = webdriver.Remote(server, desired_caps)

#点击我
time.sleep(3)
TouchAction(driver).tap(x=973, y=1747).perform()

#点击关注
time.sleep(1)
TouchAction(driver).tap(x=353, y=1145).perform()

#滚动列表页
time.sleep(1)
TouchAction(driver) .press(x=468, y=1529) .move_to(x=488, y=1200) .release() .perform()


