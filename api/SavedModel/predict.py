from keras.models import load_model
from .preprocessing import Preprocessing, PreprocessingBERT
from transformers import TFRobertaMainLayer
import numpy as np
# Tải model đã lưu
model_LSTM = load_model("api/SavedModel/Models/lstm_doc2vec_4_class.h5")
model_biLSTM = load_model("api/SavedModel/Models/bi_lstm_doc2vec_4_class.h5")
model_phoBERT = load_model("api/SavedModel/Models/PhoBert_4_class_80.h5", custom_objects={'TFRobertaMainLayer':TFRobertaMainLayer})
        

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def Predict(content, model) :
        
    if model == "biLSTM" : 
        processed_content = Preprocessing(content)
        prediction = model_biLSTM.predict(processed_content)
    elif model == 'LSTM' : 
        processed_content = Preprocessing(content)
        prediction = model_LSTM.predict(processed_content)
    elif model == 'phoBERT' : 
        ids, masks = PreprocessingBERT(content)
        prediction = model_phoBERT.predict([ids, masks])
    
    
    print(prediction)
    # classes = ['True', 'False', 'True-w-false', 'False-w-true']
    prediction = np.argmax(prediction, axis=1)
    return prediction

def predict_prob_biLSTM(data) :  
    preds = model_biLSTM.predict(data) 
    return preds

def predict_prob_BERT(data) : 
    a = {'input_ids': data[0], 'attention_mask': data[1]}
    preds = model_phoBERT.predict(a)
    return preds