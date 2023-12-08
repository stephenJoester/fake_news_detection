import re
import string
import numpy as np
from pyvi import ViTokenizer
from keras.preprocessing.text import tokenizer_from_json
from keras.preprocessing.sequence import pad_sequences
from gensim.models.doc2vec import Doc2Vec
from transformers import AutoTokenizer


# with open('api/SavedModel/tokenizer_4_class.json', 'r') as json_file:
#     loaded_tokenizer_json = json_file.read()

# loaded_tokenizer = tokenizer_from_json(loaded_tokenizer_json)
# analyzer = lambda text : text.strip().split(' ')
# loaded_tokenizer.num_words=10000
# loaded_tokenizer.split = ' '
# loaded_tokenizer.oov_token="<OOV>"
# loaded_tokenizer.analyzer=analyzer

bert_tokenizer = AutoTokenizer.from_pretrained("vinai/phobert-base-v2")

# load doc2vec
d2v = Doc2Vec.load('api/SavedModel/Tokenizers/dbow.h5')

# List of stop words
stop_words = list()
with open('api/SavedModel/Tokenizers/vietnamese-stopwords-dash.txt', 'r',encoding='utf-8') as file:
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
    '''remove links'''
    # Define a regular expression pattern for matching links
    link_pattern = re.compile(r'https?://\S+|www\.\S+')

    # Use sub to replace links with an empty string
    cleaned_text = re.sub(link_pattern, '', text)

    return cleaned_text

# def clean_text_round5(text) : 
#     '''Word segmentation'''
#     result = rdrsegmenter.word_segment(str(text))
#     if len(result) > 0:
#         return result[0]
#     else:
#         return ''
    
def clean_text_round6(text):
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
round6 = lambda x: clean_text_round6(x)

def clean_text_r1234(text) : 
    text = round1(text)
    text = round2(text)
    text = round3(text)
    text = round4(text)
    return text

def clean_text_r56(text) : 
    text = round5(text)  
    text = round6(text) 
    return text

title = 'Hà Nội hỗ trợ các nạn nhân vụ cháy chung cư mini hơn 9,2 tỷ đồng'
content = 'Tại kỳ họp chuyên đề của HĐND TP Hà Nội sáng 22/9, các đại biểu đã biểu quyết thông qua tờ trình Nghị quyết của HĐND thành phố về hỗ trợ các đối tượng bị ảnh hưởng do vụ cháy tại địa chỉ'

def Preprocessing(content) :
    content = clean_text_round1(content) 
    content = clean_text_round2(content) 
    content = clean_text_round3(content) 
    content = clean_text_round4(content) 
    content = ViTokenizer.tokenize(str(content))
    # content = clean_text_round5(content) 
    content = clean_text_round6(content) 
    
    # content = loaded_tokenizer.texts_to_sequences([content]) 
    # padded_content = pad_sequences(content, maxlen=512, truncating='post', padding='post') 
    
    content = np.array([d2v.infer_vector(content.split(' '))])
    content = np.reshape(content, (content.shape[0], 1, content.shape[1]))
    return content

def tokenizerLSTM(list_data) :
    data = np.array([d2v.infer_vector(doc.split(' ')) for doc in list_data])
    processed_data = np.reshape(data, (data.shape[0], 1, data.shape[1]))
    return processed_data

def tokenizerBERT(list_data) : 
    ids = np.zeros((len(list_data), 256))
    masks = np.zeros((len(list_data), 256))
    for i, text in enumerate(list_data) : 
        inputs = bert_tokenizer.encode_plus(text, truncation=True, padding='max_length', max_length=256, return_tensors='tf', add_special_tokens=True)
        ids[i, :] = inputs.input_ids
        masks[i, :] = inputs.attention_mask
    return ids, masks
 
def PreprocessingBERT(content) : 
    content = clean_text_round1(content) 
    content = clean_text_round2(content) 
    content = clean_text_round3(content) 
    content = clean_text_round4(content) 
    content = ViTokenizer.tokenize(str(content))
    # content = clean_text_round5(content) 
    content = clean_text_round6(content) 
    
    inputs = bert_tokenizer.encode_plus(content, truncation=True, padding='max_length', max_length=256, return_tensors='tf', add_special_tokens=True)
    ids = inputs.input_ids
    masks = inputs.attention_mask
    
    return ids, masks
    
    
    
    
    