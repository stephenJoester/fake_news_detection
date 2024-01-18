from cmath import exp
from fileinput import filename
import os, json
from newsplease import NewsPlease
import PySimpleGUI as sg
from bs4 import BeautifulSoup
import requests

class NewsData():
    def __init__(self):
        self.log = ""
        self.readme = ""
        pass

    def set_url_list(self, url_list):
        self.url_list = url_list

    def set_file_path(self, file_path):
        self.file_path = file_path

    def set_json_prefix(self, json_prefix):
        self.json_prefix = json_prefix
        
    def set_json_prefix_choices(self, json_prefix_choices):
        self.json_prefix_choices = json_prefix_choices
        
    def set_source_domain_choices(self, source_domain_choices):
        self.source_domain_choices = source_domain_choices
        
    def set_json_start_no(self, json_start_no):
        self.json_start_no = json_start_no

    def update_log(self, message):
        self.log = self.log + message
    
    def update_README(self, readme_text):
        self.readme = self.readme + readme_text

    # Technical Debt: Need checking and exception
    def processing(self):
        if self.source_domain_choices == 'khoi8406.com':
            self.news_list = self.get_khoi8406_to_list()
            self.dump_news_to_json_for_unorthodox()
            
        elif self.source_domain_choices == 'quanlambao.blogspot.com':
            self.news_list = self.get_quanlambao_to_list()
            self.dump_news_to_json_for_unorthodox() 
                   
        else:
            self.news_list = self.get_news_to_list()
            self.dump_news_to_json()
        
    def get_next_json_number(self):
        file_no = 1
        while True:
            file_name = self.json_prefix + f'{file_no}.json'
            print(file_name)
            if not os.path.exists(os.path.join(self.file_path, file_name)):
                return file_no
            file_no += 1
            
    def get_news_to_list(self):
        news_list = []
        for url in self.url_list:
            try:
                news_list.append(NewsPlease.from_url(url))
                self.update_log('Done [news] => [list]: ' + url + '...\n--------------\n')
            except Exception as e: 
                self.update_log(str(e) + ': ' + url  + '\n--------------\n')
                continue
        return news_list

    def dump_news_to_json(self):
        # file_no = int(self.json_start_no)
        file_no = self.get_next_json_number()

        readme_text = ""

        for news in self.news_list:
            try:
                file_name = self.json_prefix + str(file_no) + '.json' 
                news.__dict__['Label'] = self.json_prefix_choices[self.json_prefix]
                with open(os.path.join(self.file_path, file_name), 'w', encoding='utf-8') as outfile:
                    json.dump(news.__dict__, outfile, indent=4, sort_keys=True, default=str, ensure_ascii=False)

                self.update_log('News -> JSON: ' + str(file_name) + '\n--------------\n')
                
                news_dict = news.__dict__
                readme_text = readme_text + self.json_prefix + str(file_no) + ": [" + news_dict['title'] + "](" + news_dict['url'] + ")\n\n"
                
                file_no += 1

            except Exception as e:
                news_url = news.get_dict()['url']
                self.update_log(str(e) + ": " + news_url + '\n--------------\n')
                continue

        self.update_README(readme_text)
        
    # Khoi8406
    def get_khoi8406_to_list(self):
        news_list = []
        for url in self.url_list:
            try:
                re = requests.get(url)
                doc = BeautifulSoup(re.content, 'html.parser')
                title = doc.find('h1').text
                content = ''
                cts = doc.find_all('br')
                for ct in cts:
                    # Sử dụng .next_sibling để truy cập nội dung sau thẻ <br>
                    next_sibling = ct.next_sibling
                    # Kiểm tra xem next_sibling có phải là một chuỗi văn bản không trống
                    if next_sibling and isinstance(next_sibling, str) and next_sibling.strip():
                        content += next_sibling.strip() + " "
                news_list.append({'title': title , 'url' : url , 'maintext': content})
                
                self.update_log('Done [news] => [list]: ' + url + '...\n--------------\n')
            except Exception as e: 
                self.update_log(str(e) + ': ' + url  + '\n--------------\n')
                continue
        return news_list
    # quanlambao
    def get_quanlambao_to_list(self):
        news_list = []
        for url in self.url_list:
            try:
                re = requests.get(url)
                doc = BeautifulSoup(re.content, 'html.parser')
                title = doc.find('h3','entry-title').text
                content = ''
                cts = doc.find_all('div','entry-content')
                for ct in cts:
                    content += ct.text.strip()
                news_list.append({'title': title , 'url' : url , 'maintext': content})
                
                self.update_log('Done [news] => [list]: ' + url + '...\n--------------\n')
            except Exception as e: 
                self.update_log(str(e) + ': ' + url  + '\n--------------\n')
                continue
        return news_list
        
    def dump_news_to_json_for_unorthodox(self):
        # file_no = int(self.json_start_no)
        file_no = self.get_next_json_number()

        readme_text = ""

        for news in self.news_list:
            try:
                file_name = self.json_prefix + str(file_no) + '.json' 
                news['Label'] = self.json_prefix_choices[self.json_prefix]
                with open(os.path.join(self.file_path, file_name), 'w', encoding='utf-8') as outfile:
                    json.dump(news, outfile, indent=4, sort_keys=True, default=str, ensure_ascii=False)

                self.update_log('News -> JSON: ' + str(file_name) + '\n--------------\n')
                
                news_dict = news
                readme_text = readme_text + self.json_prefix + str(file_no) + ": [" + news_dict['title'] + "](" + news_dict['url'] + ")\n\n"
                
                file_no += 1

            except Exception as e:
                news_url = news['url']
                self.update_log(str(e) + ": " + news_url + '\n--------------\n')
                continue

        self.update_README(readme_text)

def main():
    # Web available
    
    sg.theme('Reddit')
    json_prefix_choices  = {
        'True_news_' : 'True', 
        'False_news_': 'False', 
        'True-w-false_news_': 'True-w-false', 
        'False-w-true_news_': 'False-w-true', 
        'Undetermined_news_': 'Undetermined'
    }
    source_domain_choices = ['None','khoi8406.com', 'quanlambao.blogspot.com']
    upper_row = [
        [sg.Text('Usable-website:',text_color='red', font = 'bold')],
        [sg.Text('- Official : nhandan.vn, dantri.com.vn, thanhnien.vn, vietnamnet.vn, vnexpress.net, tuoitre.vn,.. ')],
        [sg.Text('- Unofficial : nhanvanviet.com, www.rfi.fr/vi/, viettan.org (Fake ip), danlambao.blogspot.com (Fake ip),')],
        [sg.Text('khoi8406, quanlambao.blogspot.com')],
        [sg.Text('--------------------------------')],
        [sg.Text('Label:',text_color='red', font = 'bold')],
        [sg.Text('Save Folder: ', s=20), sg.In(size=(50,2), enable_events=True ,key='-FOLDER-'), sg.FolderBrowse(size=(10,1))],
        [sg.Text('Source domain: ', s=20), sg.Combo(list(source_domain_choices), enable_events=True, key='-SOURCE COMBO-')],
        [sg.Text('JSON Prefix: ', s=20), sg.Combo(list(json_prefix_choices.keys()), enable_events=True, key='-PREFIX COMBO-')],
        [sg.Text('--------------------------------')],
        [sg.Text('Lưu ý:', text_color='red', font = 'bold')],
        [sg.Text('- Các website là viettan, danlambao sẽ có vài bài bị lỗi trong "maintext" = null')],
        [sg.Text('- Ngoại trừ website là khoi8406, quanlambao còn các website còn lại thì source domain : None ')],
        # [sg.Text('JSON Start No.: ', s=20), sg.In(size=(50,2), enable_events=True, key='-START INP-')],
        # [sg.Button('Save Profile'), sg.Button('LoadProfile')]
    ]

    left_col = [[sg.Text('News URL List (1 URL/line): ')],
                [sg.Multiline(enable_events=True, size=(40,20), key='-URLLIST INP-')]]

    right_col = [[sg.Text('Result:')],
                [sg.Multiline(font='Courier 10', key='-OUTPUT-', size=(40,20), expand_x=True, expand_y=True, reroute_cprint=True, write_only=True, autoscroll=True)]
                ]

    below_row = [
        [sg.Button('START CRAWL', expand_x=True, key='-START PROCESS-')]
    ]

    # ----- Full layout -----
    layout = [
        [sg.Column(upper_row)],
        [sg.Column(left_col), sg.VSeperator(), sg.Column(right_col)],
        [below_row]
    ]

    # --------------------------------- Create Window ---------------------------------
    window = sg.Window('NEWS CRAWL', layout)
    controler = NewsData()

    # ----- Run the Event Loop -----
    # --------------------------------- Event Loop ---------------------------------
    while True:
        event, values = window.read()
        
        if event in (None, 'Exit'):
            break
        if event == '-FOLDER-':
            folder = values['-FOLDER-']            
            controler.set_file_path(folder)
            
        elif event == '-PREFIX COMBO-':
            json_prefix = values['-PREFIX COMBO-']
            controler.set_json_prefix(json_prefix)
            controler.set_json_prefix_choices(json_prefix_choices)
            
        elif event == '-SOURCE COMBO-':
            source_domain_choices = values['-SOURCE COMBO-']
            controler.set_source_domain_choices(source_domain_choices)
            
        # elif event == '-START INP-':
        #     # Technical Debt: Need to check type of input
        #     json_start = values['-START INP-']
        #     controler.set_json_start_no(json_start)            

        elif event == '-START PROCESS-':
            # Technical Debt: No checking at the moment
            url_list_str = values['-URLLIST INP-']
            url_list = url_list_str.split('\n')
            
            controler.set_url_list(url_list)
            window['-OUTPUT-'].update(controler.log)

            controler.processing()
            window['-OUTPUT-'].update(controler.log)

            readme_log = controler.log + "\nUPDATE README.md------------------- \n" + controler.readme
            window['-OUTPUT-'].update(readme_log)

    window.close()
    # --------------------------------- Close & Exit ---------------------------------

if __name__ == '__main__':
    main()