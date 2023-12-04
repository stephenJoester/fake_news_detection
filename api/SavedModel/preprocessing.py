import re
import string
from pyvi import ViTokenizer
from keras.preprocessing.text import tokenizer_from_json
from keras.preprocessing.sequence import pad_sequences

with open('api/SavedModel/tokenizer_4_class.json', 'r') as json_file:
    loaded_tokenizer_json = json_file.read()

loaded_tokenizer = tokenizer_from_json(loaded_tokenizer_json)
analyzer = lambda text : text.strip().split(' ')
loaded_tokenizer.num_words=10000
loaded_tokenizer.split = ' '
loaded_tokenizer.oov_token="<OOV>"
loaded_tokenizer.analyzer=analyzer

# List of stop words
stop_words = list()
with open('api/SavedModel/vietnamese-stopwords-dash.txt', 'r',encoding='utf-8') as file:
    lines = file.readlines()
    stop_words = [line.strip() for line in lines]

def clean_text_round1(text):
    '''Make text lowercase, remove text in round  brackets, remove new line character, remove punctuation and remove words containing numbers.'''
    text = str(text).lower()
    text = re.sub(r'\(.*?\)', '', text)
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub(r'[·–‘’“”…]', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    text = re.sub(r'\s{2,}', ' ', text)
    return text.strip()

def clean_text_round2(text):
    '''Remove imojis'''
    # Mẫu regex để khớp với các emoji dựa trên các mã Unicode
    emoji_pattern = re.compile("["
                           u"\U0001F600-\U0001F64F"  # emoticons
                           u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                           u"\U0001F680-\U0001F6FF"  # transport & map symbols
                           u"\U0001F700-\U0001F77F"  # alchemical symbols
                           u"\U0001F780-\U0001F7FF"  # Geometric Shapes Extended
                           u"\U0001F800-\U0001F8FF"  # Supplemental Arrows-C
                           u"\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
                           u"\U0001FA00-\U0001FA6F"  # Chess Symbols
                           u"\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
                           u"\U0001FAA0-\U0001FAAF"  # Symbols for Legacy Computing
                           u"\U0001F004-\U0001F0CF"  # Miscellaneous Symbols and Pictographs
                           u"\U0001F170-\U0001F251"  # Enclosed Alphanumeric Supplement
                           "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', str(text))

def clean_text_round3(text):
    '''Remove chinese chracters'''
    text = re.sub(r'[\u4e00-\u9fff]', '', text)
    return text

def clean_text_round4(text):
    '''Remove stop words'''
    # Create a regex pattern to match stop words
    pattern = r'\b(?:' + '|'.join(map(re.escape, stop_words)) + r')\b'
    text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

round1 = lambda x: clean_text_round1(x)
round2 = lambda x: clean_text_round2(x)
round3 = lambda x: clean_text_round3(x)
round4 = lambda x: clean_text_round4(x)
round5 = lambda x: ViTokenizer.tokenize(str(x))

def clean_text_r123(text) : 
    text = round1(text)
    text = round2(text)
    text = round3(text)
    return text

def clean_text_r45(text) : 
    text = round4(text)  
    text = round5(text) 
    return text

title = 'Hà Nội hỗ trợ các nạn nhân vụ cháy chung cư mini hơn 9,2 tỷ đồng'
content = 'Tại kỳ họp chuyên đề của HĐND TP Hà Nội sáng 22/9, các đại biểu đã biểu quyết thông qua tờ trình Nghị quyết của HĐND thành phố về hỗ trợ các đối tượng bị ảnh hưởng do vụ cháy tại địa chỉ'

def Preprocessing(content) :
    content = clean_text_round1(content) 
    content = clean_text_round2(content) 
    content = clean_text_round3(content) 
    content = clean_text_round4(content) 
    content = ViTokenizer.tokenize(str(content))
    
    content = loaded_tokenizer.texts_to_sequences([content]) 
    padded_content = pad_sequences(content, maxlen=512, truncating='post', padding='post') 
    return padded_content

def tokenizer(list_data) :
    data = loaded_tokenizer.texts_to_sequences(list_data) 
    padded_data = pad_sequences(data, maxlen=512, truncating='post', padding='post')
    return padded_data
 
    