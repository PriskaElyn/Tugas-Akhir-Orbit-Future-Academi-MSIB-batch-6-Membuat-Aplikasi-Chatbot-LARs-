from flask import Flask, request, jsonify , render_template
import json
from urllib.parse import quote as url_quote
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder
import numpy as np


app = Flask(__name__)

# Load the model
model = tf.keras.models.load_model('LSTM_model (2).h5')

# Load tokenizer
with open('tokenizer (2).json') as f:
    data = f.read()  # Read the file as a string
    tokenizer = tf.keras.preprocessing.text.tokenizer_from_json(data)

# Load label encoder
with open('label_encoder (2).json') as f:
    data = json.load(f)
    le = LabelEncoder()
    le.classes_ = np.array(data['classes'])

# Function to preprocess input and predict
def preprocess_and_predict(text):
    # Preprocess the input
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequences = pad_sequences(sequences, maxlen=model.input_shape[1])
    
    # Predict
    prediction = model.predict(padded_sequences)
    predicted_class = np.argmax(prediction, axis=1)
    response_tag = le.inverse_transform(predicted_class)[0]
    
    return response_tag

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json.get('message')
    response_tag = preprocess_and_predict(user_input)
    
    # Assuming responses dictionary is loaded from the content.json file
    with open('content.json') as content:
        data1 = json.load(content)
    responses = {intent['tag']: intent['responses'] for intent in data1['intents']}
    
    response = responses.get(response_tag, ["Maaf, saya tidak mengerti."])[0]
    
    return jsonify({'response': response})


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/ketenagakerjaan_page')
def ketenagakerjaan():
    return render_template('service_ketenagakerjaan.html')

@app.route('/perdata_page')
def perdata():
    return render_template('service_perdata.html')

@app.route('/pidana_page')
def pidana():
    return render_template('service_pidana.html')

@app.route('/umum_page')
def hukumUmum():
    return render_template('service_hukum_umum.html')


if __name__ == '__main__':
    app.run(debug=True)
