#coding:utf-8

from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
import time
import json
import sys
import urllib
from urllib import request
from selenium.webdriver.chrome.options import Options

class myvideosave():
	"""docstring for myvideosave"""
	def __init__(self):
		super(myvideosave, self).__init__()

	def run(self,url):
		chromeOptions = Options()
        #启动 flash
		prefs= {
		    "profile.managed_default_content_settings.images":1,
		    "profile.content_settings.plugin_whitelist.adobe-flash-player":1,
		    "profile.content_settings.exceptions.plugins.*,*.per_resource.adobe-flash-    player":1,

		}


		chromeOptions.add_experimental_option('prefs', prefs)

		d = DesiredCapabilities.CHROME

		d['loggingPrefs'] = { 'performance':'ALL' }

		driver = webdriver.Chrome('/usr/local/bin/chromedriver', desired_capabilities=d,chrome_options=chromeOptions)

		driver.get(url)
		#等待视频播放
		time.sleep(60)
		#获得所有网络请求
		lo=driver.get_log('performance')
		#聚合 请求分类
		datalist={}
		for entry in lo:

		    try:
		         m=json.loads(entry['message'])['message']["params"]["response"]
		         k=m['headers']['Content-Type']
		         url=m['url']
		         if k not in datalist:
		             datalist[k]=[url]
		         else:
		              datalist[k].append(url)

		         #print( "-------------------------")
		    except Exception as e:
		         continue
		#页面存在的 播放过的视频
		videolist=[]
		filename=""
		for x in datalist:
			if x.find("video")>-1:
				filename=x.replace("video/",".")
				videolist=datalist[x]

		#保存视频 在当前目录
		for x in range(0,len(videolist)):
			urllib.request.urlretrieve(videolist[x],str(x)+filename)

		#sys.stdout.write 同 print(str(datalist))
		sys.stdout.write(str(datalist))
		sys.stdout.flush()

		#关闭浏览器
		driver.quit()

if __name__ == '__main__':

	#url="https://www.iqiyi.com/v_19rsili404.html"
	url="https://www.youtube.com/watch?v=A6m1ToytzF8"
	myvideosave().run(url)
