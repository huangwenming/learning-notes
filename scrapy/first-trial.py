import requests
from bs4 import BeautifulSoup

r = requests.get('https://beijing.douban.com/events/week-drama-128526')
html = r.content
#html.parser是解析器
soup = BeautifulSoup(html,'html.parser')

li_entry_list = soup.find_all('li', attrs={'class': 'list-entry'})

for entry in li_entry_list:
    entry_link = entry.find('a', attrs={'itemprop': 'url'})
    if hasattr(entry_link, 'title'):
        print(entry_link['title'])