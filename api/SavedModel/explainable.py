from lime.lime_text import LimeTextExplainer
from keras.models import load_model
from .preprocessing import Preprocessing, clean_text_r1234, clean_text_r56, tokenizerLSTM, tokenizerBERT
from .predict import Predict, predict_prob_biLSTM, predict_prob_BERT, predict_prob_LSTM
import nltk
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics.pairwise import cosine_similarity
import time

explainer = LimeTextExplainer(class_names=['Fake news', 'Real news'])


SEP = "_"

num_features = 1
array = []
data_splitted = []

def split_sentence(text) : 
    sentences = nltk.sent_tokenize(text)
    for i in range(len(sentences)) :
        sentences[i] = sentences[i].strip()
    return sentences
        

def prepare_data(data) : 
    # a = data.split('.')
    a = split_sentence(data)
    # print(a)
    global data_splitted 
    data_splitted = a.copy()
    global num_features
    num_features = len(a)
    a = list(filter(lambda item: item != "", a)) 
    global array
    for i in range(len(a)) : 
        a[i] = clean_text_r1234(a[i]) 
        list_item = a[i].split(' ') 
        list_item = list(filter(lambda item: item != "", list_item)) 
        a[i] = SEP.join(list_item).strip() 
        # a[i] = a[i].replace(" ", "")
        
        # print(a[i])
        # print("//////////////////////////////////////")
        
    array = a.copy()
    a = ' '.join(a) 
    return a

def classifier_prob_biLSTM(list_samples) : 
    for i in range(len(list_samples)) :
        list_sentence = list_samples[i].split(' ') 
        list_sentence = [sentence.replace(SEP, ' ') for sentence in list_sentence]
        list_samples[i] = clean_text_r56(' '.join(list_sentence)) 
        
    processed_data = tokenizerLSTM(list_samples) 
    preds = predict_prob_biLSTM(processed_data)
    return preds

def classifier_prob_LSTM(list_samples) : 
    for i in range(len(list_samples)) :
        list_sentence = list_samples[i].split(' ') 
        list_sentence = [sentence.replace(SEP, ' ') for sentence in list_sentence]
        list_samples[i] = clean_text_r56(' '.join(list_sentence)) 
        
    processed_data = tokenizerLSTM(list_samples) 
    preds = predict_prob_LSTM(processed_data)
    return preds

def classifier_prob_BERT(list_samples) : 
    for i in range(len(list_samples)) :
        list_sentence = list_samples[i].split(' ') 
        list_sentence = [sentence.replace(SEP, ' ') for sentence in list_sentence]
        list_samples[i] = clean_text_r56(' '.join(list_sentence)) 

    ids, masks = tokenizerBERT(list_samples)
    preds = predict_prob_BERT([ids, masks])
    return preds
    

# calculate similarity of 2 texts
def levenshtein_distance(s, t):
    m, n = len(s), len(t)
    if m < n:
        s, t = t, s
        m, n = n, m
    d = [list(range(n + 1))] + [[i] + [0] * n for i in range(1, m + 1)]
    for j in range(1, n + 1):
        for i in range(1, m + 1):
            if s[i - 1] == t[j - 1]:
                d[i][j] = d[i - 1][j - 1]
            else:
                d[i][j] = min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1
    return d[m][n]

def compute_similarity(input_string, reference_string):
    distance = levenshtein_distance(input_string, reference_string)
    max_length = max(len(input_string), len(reference_string))
    similarity = 1 - (distance / max_length)
    return similarity

def isSimilar(text1, text2) : 
    if compute_similarity(text1, text2) > 0.5 : 
        return True
    return False 
    

# call this function to get explain list
def Explain(data,model) : 
    a = prepare_data(data) 
    
    if model == 'phoBERT': 
        exp = explainer.explain_instance(a, classifier_fn=classifier_prob_BERT, labels=(0,1,2,3), num_features=num_features, num_samples=100) 
    elif model == 'biLSTM' :
        exp = explainer.explain_instance(a, classifier_fn=classifier_prob_biLSTM, labels=(0,1,2,3), num_features=num_features, num_samples=500) 
    elif model == 'LSTM' : 
        exp = explainer.explain_instance(a, classifier_fn=classifier_prob_biLSTM, labels=(0,1,2,3), num_features=num_features, num_samples=500) 
        
    predicted_label = Predict(data,model)
    print(predicted_label)
    explain_list = exp.as_list(label=predicted_label[0])
    # print(explain_list)
    
    # sort explain list
    index_map = {value: index for index, value in enumerate(array)}
    
    sorted_explain_list = sorted(explain_list, key=lambda x: index_map.get(next((k for k in array if x[0] in k), len(array))))
    sorted_explain_list = [(data_splitted[index], item[1]) for index, item in enumerate(sorted_explain_list)]
    # print(sorted_explain_list) 
    return sorted_explain_list
    
    
