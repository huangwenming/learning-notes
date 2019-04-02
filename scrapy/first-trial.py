import requests
from bs4 import BeautifulSoup
import pandas as pd

r = requests.get('https://beijing.douban.com/events/week-drama-128526')
html = r.content
#html.parser是解析器
soup = BeautifulSoup(html,'html.parser')

#豆瓣活动的城市
city = soup.find('div', attrs={'class', 'local-label'})
print('当前城市：', city.text)

#所选择的城市区域
locs = soup.find('div', attrs={'class', 'events-filter-loc'})
loc = locs.find('div', {'class', 'selected'}).text
print('当前城市区域：', loc)

#所选择的活动分类
navi_title = soup.find('label', attrs={'class', 'events-nav-title'})
main_type = navi_title.parent.find('span').text

filters = soup.find('div', attrs={'class', 'events-filter-subtype'})
sub_type = filters.find('span').text
print('当前类别：', main_type, sub_type)

#活动时间
navi_times = soup.findAll('label', attrs={'class', 'events-nav-title'})[1]
time = navi_times.parent.find('span').text
print('活动时间：：', time)




li_entry_list = soup.find_all('li', attrs={'class': 'list-entry'})

for entry in li_entry_list:
    entry_link = entry.find('a', attrs={'itemprop': 'url'})
    if hasattr(entry_link, 'title'):
        title = entry_link['title']
        link = entry_link['href']
        print(title, link, sep=' ')
