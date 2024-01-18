import requests
from bs4 import BeautifulSoup
import json

# Define the URL of the website
urls = [
        'https://viettan.org/50-dai-bieu-ngoai-dang-de-lam-gi/',
        'https://viettan.org/co-cu-tri-cong-khai-tay-chay-bau-cu-quoc-hoi-hoi-dong-nhan-dan-cac-cap/',
        'https://viettan.org/cong-nghiep-van-hoa/',
        'https://viettan.org/lap-to-vai-tu-phuong-xin-vaccine/',
        'https://viettan.org/ung-thu-chinh-tri/',
        'https://viettan.org/du-la-dang-vien-hay-khong-nguoi-dan-dang-phai-tra-hang-nghin-ty-dong-cho-cac-dai-hoi-dang/',
        'https://viettan.org/khe-cua-hep-cho-ung-cu-vien-tre-ngoai-dang/',
        'https://viettan.org/vu-viet-a-mat-tran-to-quoc-doi-truy-trach-nhiem-2-bo-y-te-khoa-hoc-cong-nghe/']

# if error, put the r before the string
file_paths = [
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\False_w_true\\False-w-true_news_16.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\False_w_true\\False-w-true_news_18.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\False_w_true\\False-w-true_news_19.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\False_w_true\\False-w-true_news_20.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\False_w_true\\False-w-true_news_24.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\True\\True_news_102.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\True\\True_news_103.json',
            'D:\\University-subjects\\Nam4-HK1\\PBL6\\workspace\\Data-collection\\my-collection\\json_hoang\\True\\True_news_104.json',]
if len(urls) != len(file_paths):
    print("Lengths of urls and file_paths are not equal")
    exit()

for i in range(len(urls)):
    url = urls[i]
    file_path = file_paths[i]
    print(file_path)
    # Send a GET request to the URL
    response = requests.get(url)

    # Parse the HTML response
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the content you're interested in
    content = soup.findAll('div', class_='elementor-widget-container')

    raw_text = ""
    list_p_tags = []
    for div_tag in content:
        p_tags = div_tag.find_all('p')
        for p_tag in p_tags:
            list_p_tags.append(p_tag)

    for p_tag in list_p_tags:
        if p_tag.text.isspace():
            break
        raw_text += p_tag.text

    # Open the file for reading
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Modify the data
    data["maintext"] = raw_text

    # Open the file again for writing
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

print("Done")