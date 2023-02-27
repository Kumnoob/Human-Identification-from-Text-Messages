from flask import Flask, send_file, request
import numpy as np
import io
from flask_cors import CORS
from pymongo import MongoClient
import pathlib
import json
from bson.json_util import dumps, loads
from keras.models import load_model
import tensorflow as tf
from keras_preprocessing.text import Tokenizer
from keras_preprocessing.sequence import pad_sequences

model = load_model('lstm_model.h5')

print("tensorflow is running in version:",tf.__version__)

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://phlpat:P1234567890@cluster0.hm4z34c.mongodb.net/test')
db = client.mydb

# test mongo


@app.route('/')
def hello():
    return str(db.authors.find_one({"name": "History"}))

# test flask


@app.route('/image/<image_id>')
def image(image_id):
    # code to determine the path of the image based on image_id
    return send_file(pathlib.Path("basleng"+image_id+".jpg").resolve(), mimetype='image/jpg')


messages = []

# POST METHOD


@app.route('/search', methods=['POST'])
def predict():
    null = ""
    if request.method == 'POST':
        body = request.get_json()
        print(body)
        messages.append(body)

        message = body["message"]
        messages.pop()

        # Example input string
        input_string = message

        # Initialize a tokenizer with a vocabulary size of 1000
        tokenizer = Tokenizer(num_words=1000)

        # Fit the tokenizer on the input string
        tokenizer.fit_on_texts([input_string])

        # Convert the input string to a sequence of integers
        input_sequence = tokenizer.texts_to_sequences([input_string])

        # Pad the sequence to length 100 (if it is shorter than 100) or truncate it (if it is longer than 100)
        max_sequence_length = 1
        padded_input_sequence = pad_sequences(input_sequence, maxlen=max_sequence_length, padding='post', truncating='post')

        # Convert the padded sequence to a NumPy array
        input_data = np.array(padded_input_sequence)

        # Embed the input data using an embedding layer with 300 dimensions
        from keras.layers import Embedding
        embedding_layer = Embedding(input_dim=1000, output_dim=300, input_length=max_sequence_length)
        embedded_input_data = embedding_layer(input_data)

        # Make predictions on the embedded input data
        prediction = model.predict(embedded_input_data)

        class_label = np.argmax(prediction, axis=1)
        
        # print(str(prediction))
        print(int(class_label))

        try:
            authors = db.authors.find({"id": int(class_label)})
            test = list(authors)
            if(test == []):
                return [{"id": "", "name": "", "text": ""}]
            else:
                return dumps(test)
        except ValueError:
            pass
    
    return {"log": "message is being processed", "id": null}, 201


@app.route('/preview', methods=['GET'])
def preview():
    if request.method == 'GET':
        try:
            authors = list(db.authors.find({}))
            test = list(authors)
            print(test)
            return dumps(test), 201
        except ValueError:
            pass

if __name__ == '__main__':

    # all authors
    # authors = list(db.authors.find({}))
    # for author in authors:
    #     for key, value in author.items():
    #         if type(value) == str or type(value) == int:
    #             print(key, ":", value)

    # first author
    # author = db.authors.find_one()
    # print(author)

    # find specific author
    # authors = db.authors.find({'id': 2})
    # for author in authors:
    #     for key, value in author.items():
    #         if (key == 'name'):
    #             print(value)

    app.run()
