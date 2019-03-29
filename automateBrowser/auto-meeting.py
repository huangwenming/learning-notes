from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

#函数：等待查找的DOM显示出来，最大等到时长是5s
def waitFind(locator):
   element = WebDriverWait(driver, 5000).until(
           EC.presence_of_element_located(locator)
       )
   return element

#函数：等待查找的DOM可点击，最大等到时长是5s
def waitClickable(locator):
   element = WebDriverWait(driver, 5000).until(
           EC.element_to_be_clickable(locator)
       )
   return element

#打开指定的页面
driver = webdriver.Chrome()
driver.get('http://meeting.baidu.com/index.html#/home');

#uuap登录
waitFind((By.NAME, "username")).send_keys('')
waitFind((By.NAME, "password")).send_keys('')
waitFind((By.ID, "emailLogin")).click();

#关闭新人提示
waitClickable((By.CLASS_NAME, "el-dialog__headerbtn")).click();

#等到新人提示弹窗关闭后，选择下周会议室
waitClickable((By.CSS_SELECTOR, '.header-bar .item:nth-of-type(9) span')).click();

#选择抢南宫会议室
waitClickable((By.CSS_SELECTOR, '.time-box .time-list:nth-of-type(7) .use')).click();

#执行预定
waitClickable((By.CSS_SELECTOR, '.reserver-active .reserver-box .btn-book:nth-of-type(3)')).click();
