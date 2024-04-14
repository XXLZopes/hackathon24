import requests
from bs4 import BeautifulSoup
import json

base_url = "https://pine.humboldt.edu/anstud/cgi-bin/"
url = base_url + "filt_schd.pl?relevant=sched_ind_Fall.out"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

links = [(a.text, base_url + a['href']) for td in soup.find_all('td') for a in td.find_all('a')]

data = []

for subject, link in links:
    # response = requests.get(link)
    soup = BeautifulSoup(response.content, 'html.parser')

    table_rows = soup.find('table').find_all('tr')

    data.append({
                    'subjectName': subject,
                })
                
    # Check if the current page is Zoology, then break out of the loop
    if subject == "Zoology":
        print("Reached Zoology page. Stopping scraping.")
        break

print("Scraping completed.")

# Writing data to JSON file
with open('subjects.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Data written to subjects.json")
