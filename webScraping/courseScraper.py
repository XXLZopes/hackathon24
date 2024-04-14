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
    response = requests.get(link)
    soup = BeautifulSoup(response.content, 'html.parser')

    table_rows = soup.find('table').find_all('tr')
    
    for row in table_rows:
        tds = row.find_all('td')
        if len(tds) > 8:
            cn = tds[2].text.strip()
            className = tds[0].text.strip()
            times = tds[8].text.strip()
            days = tds[7].text.strip()
            
            if (days):
                start_time = times.split("-")[0]
                end_time = times.split("-")[1]
                time = []
                for day in days:
                    time.append({
                        "day": day,
                        "start_time": start_time,
                        "end_time": end_time
                    })

            className = className.replace("  ", "_");
            className = className.replace(" ", "_");    

            
            if className.lower() != "laboratory" and className.lower() != "activity" and cn and className:
                data.append({
                    'CN': cn,
                    'subject': subject,
                    'courseName': className,
                    'courseTimes': time
                })

    # Check if the current page is Zoology, then break out of the loop
    if subject == "Zoology":
        print("Reached Zoology page. Stopping scraping.")
        break

print("Scraping completed.")

# Writing data to JSON file
with open('course_data.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Data written to course_data.json")
