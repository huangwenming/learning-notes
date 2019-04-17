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
time.sleep(5)
#driver.find_element_by_android_uiautomator ("text(\"我\")").click()
driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.TabHost/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.FrameLayout[5]').click()

#点击关注
time.sleep(1)
#driver.find_element_by_android_uiautomator ("text(\"关注\")").click()
driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.TabHost/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout[4]/android.widget.LinearLayout[2]').click()

#滚动列表页
time.sleep(1)
TouchAction(driver) .press(x=468, y=1529) .move_to(x=488, y=1200) .release() .perform()


