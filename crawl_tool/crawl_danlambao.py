import requests
from bs4 import BeautifulSoup
import json

# Define the URL of the website
urls = ['https://danlambaovn.blogspot.com/2021/01/tu-nhan-luong-tam-viet-nam-nhu-ca-nam.html',
        'https://danlambaovn.blogspot.com/2021/02/tai-sao-tong-bi-thu-tran-phu-lai-uoc.html',
        'https://danlambaovn.blogspot.com/2021/05/cai-lo.html']

file_paths = ['D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_quoc_2\\unofficial\\Undetermined_news_12.json',
              'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_quoc_2\\unofficial\\Undetermined_news_13.json',
              'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_quoc_2\\unofficial\\Undetermined_news_14.json']

for i in range(len(urls)):
    url = urls[i]
    file_path = file_paths[i]
    print(file_path)
    # Send a GET request to the URL
    response = requests.get(url)

    # Parse the HTML response
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the content you're interested in
    content = soup.find('div', class_='post-body entry-content')

    # Get the p tag children of the div tag
    div_tags = content.find_all('div')

    raw_text = ""
    for div_tag in div_tags:
        raw_text+=div_tag.text

    # Open the file for reading
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Modify the data
    data["maintext"] = raw_text

    # Open the file again for writing
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

print("Done")