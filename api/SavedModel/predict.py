from keras.models import load_model
from .preprocessing import Preprocessing
from transformers import TFRobertaMainLayer
import numpy as np
# Tải model đã lưu
model_biLSTM = load_model("api/SavedModel/bi_lstm_softmax_4_class.h5")
# model_phoBERT = load_model("api/SavedModel/PhoBert_4_class.h5", custom_objects={'TFRobertaMainLayer':TFRobertaMainLayer})
        

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def Predict(content, model) :
        
    processed_content = Preprocessing(content)
    if model == "biLSTM" : 
        prediction = model_biLSTM.predict(processed_content)
    elif model == 'phoBERT' : 
        # prediction = model_phoBERT.predict(processed_content)
        pass
    print(prediction)
    prediction = np.argmax(prediction, axis=1)
    return prediction

def predict_prob(data) :  
    preds = model_biLSTM.predict(data) 
    return preds