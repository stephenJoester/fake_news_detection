from keras.models import load_model
from .preprocessing import Preprocessing, PreprocessingBERT
from transformers import TFRobertaMainLayer
import numpy as np
import json
import requests

# Tải model đã lưu
# model_LSTM = load_model("api/SavedModel/Models/lstm_doc2vec_4_class.h5")
# model_biLSTM = load_model("api/SavedModel/Models/bi_lstm_doc2vec_4_class.h5")
# model_phoBERT = load_model("api/SavedModel/Models/PhoBert_4_class_80.h5", custom_objects={'TFRobertaMainLayer':TFRobertaMainLayer})
        

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def Predict(content, model) :
    prediction = []
    if model == "biLSTM" : 
        api_url = "http://localhost:8100/v1/models/biLSTM:predict"
        processed_content = Preprocessing(content)
        payload = {
            "instances": processed_content.tolist()
        }
    
        response = requests.post(api_url, data=json.dumps(payload)) 
        if response.status_code == 200 : 
            result = response.json()
            prediction = result['predictions']
        else : 
            print("Error:", response.status_code, response.text)
      
        # prediction = model_biLSTM.predict(processed_content)
    elif model == 'LSTM' : 
        api_url = "http://localhost:8100/v1/models/LSTM:predict"
        processed_content = Preprocessing(content)
        payload = {
            "instances": processed_content.tolist()
        }
    
        response = requests.post(api_url, data=json.dumps(payload)) 
        if response.status_code == 200 : 
            result = response.json()
            prediction = result['predictions']
        else : 
            print("Error:", response.status_code, response.text)
    elif model == 'phoBERT' : 
        ids, masks = PreprocessingBERT(content)
        ids = ids.numpy().tolist()
        masks = masks.numpy().tolist()
        
        api_url = "http://localhost:8100/v1/models/PhoBert:predict"
        payload = {
            "instances": [{"input_ids" : ids[0], "attention_mask" : masks[0]}]
        }
    
        response = requests.post(api_url, data=json.dumps(payload)) 
        if response.status_code == 200 : 
            result = response.json()
            prediction = result['predictions']
        else : 
            print("Error:", response.status_code, response.text)
        # prediction = model_phoBERT.predict([ids, masks])
    
    
    print(prediction)
    # classes = ['True', 'False', 'True-w-false', 'False-w-true']
    prediction = np.argmax(prediction, axis=1)
    return prediction

def predict_prob_biLSTM(data) :  
    api_url = "http://localhost:8100/v1/models/biLSTM:predict"
    payload = {
        "instances": data.tolist()
    }
    print(len(data))
    response = requests.post(api_url, data=json.dumps(payload)) 
    if response.status_code == 200 : 
        result = response.json()
        preds = result['predictions']
        preds = np.array(preds)
        print(preds.shape)
    else : 
        print("Error:", response.status_code, response.text)
      
    # preds = model_biLSTM.predict(data) 
    return preds

def predict_prob_LSTM(data) :  
    api_url = "http://localhost:8100/v1/models/LSTM:predict"
    payload = {
        "instances": data.tolist()
    }
    print(len(data))
    response = requests.post(api_url, data=json.dumps(payload)) 
    if response.status_code == 200 : 
        result = response.json()
        preds = result['predictions']
        preds = np.array(preds)
        print(preds.shape)
    else : 
        print("Error:", response.status_code, response.text)
      
    return preds

def predict_prob_BERT(data) : 
    # a = {'input_ids': data[0], 'attention_mask': data[1]}
    preds = []
    ids = data[0].tolist()
    masks = data[1].tolist()
    # print(len(ids))

    ids = [[int(x) for x in sample] for sample in ids]
    masks = [[int(x) for x in sample] for sample in masks]
    # print(ids)
    
    api_url = "http://localhost:8100/v1/models/PhoBert:predict"
    payload = {
        "instances": [{"input_ids" : ids_i, "attention_mask" : masks_i} for ids_i, masks_i in zip(ids, masks)]
    }
    response = requests.post(api_url, data=json.dumps(payload)) 
    if response.status_code == 200 : 
        result = response.json()
        preds = result['predictions']
        preds = np.array(preds)
        # print(preds.shape)
    else : 
        print("Error:", response.status_code, response.text)

    return preds