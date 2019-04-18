from appium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from appium.webdriver.common.touch_action import TouchAction
import time
from pandas import Series, DataFrame
import pandas as pd

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
driver.find_element_by_android_uiautomator ("text(\"我\")").click()
#driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.TabHost/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.FrameLayout[5]').click()

#点击关注
time.sleep(1)
#xpath：//android.widget.TextView[@text=”关注”]
driver.find_element_by_android_uiautomator ("text(\"关注\")").click()
#driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.FrameLayout/android.support.v4.view.ViewPager/android.widget.TabHost/android.widget.FrameLayout/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout[4]/android.widget.LinearLayout[2]').click()

#滚动列表页
time.sleep(1)
#获取屏幕宽高：
width = driver.get_window_size()['width']
height = driver.get_window_size()['height']
listView = driver.find_element_by_xpath("//android.support.v7.widget.RecyclerView")
list = listView.find_element_by_class_name("android.widget.RelativeLayout")

#listContainer = driver.find_element_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.support.v7.widget.RecyclerView')
#lists = driver.find_elements_by_xpath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.LinearLayout/android.support.v7.widget.RecyclerView/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.TextView');


i=0
while i < 100:
    try:
        #尝试找到列表底部元素
        driver.find_elements_by_xpath('//android.widget.TextView[@text=”暂时没有更多了”]')
        break
    except Exception as e:
        lists = driver.find_elements_by_xpath("//android.widget.TextView[contains(@text, '@')]")
        for list in lists:
            print(list.text)
        print("Good bye!")
        #滑动屏幕
        time.sleep(1)
        driver.swipe(width/2, height*0.8, width/2, height*0.2)


