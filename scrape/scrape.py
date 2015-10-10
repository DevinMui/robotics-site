from bs4 import BeautifulSoup
from urllib2 import urlopen

BASE_URL = "http://www.robotevents.com/robot-competitions/vex-robotics-competition"

def get_dates(url):
	html = urlopen(url).read()
	soup = BeautifulSoup(html, 'lxml')
	boccat = soup.find("table", "catalog-listing")
	rows = [td.string for td in boccat.findAll("td")]
	rows = filter(None, rows)
	rows = map(lambda s: s.strip(), rows)
	dates = rows
	return dates

soup = BeautifulSoup(urlopen(BASE_URL).read().decode('utf-8', errors='ignore'), 'lxml')
for tr in soup.findAll('tr'):
	tds = tr.findAll('td')
	print "Date: %s, Location: %s, Link: %s" % (tds[0].text, tds[1].text, a[0])
