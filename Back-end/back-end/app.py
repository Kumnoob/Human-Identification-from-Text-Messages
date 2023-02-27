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

print("tensorflow is running in version:", tf.__version__)

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://phlpat:P1234567890@cluster0.hm4z34c.mongodb.net/test')
db = client.mydb


@app.route('/')
def hello():
    return "Identification from Text Messages"

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
        padded_input_sequence = pad_sequences(
            input_sequence, maxlen=max_sequence_length, padding='post', truncating='post')

        # Convert the padded sequence to a NumPy array
        input_data = np.array(padded_input_sequence)

        # Embed the input data using an embedding layer with 300 dimensions
        from keras.layers import Embedding
        embedding_layer = Embedding(
            input_dim=1000, output_dim=300, input_length=max_sequence_length)
        embedded_input_data = embedding_layer(input_data)

        # Make predictions on the embedded input data
        prediction = model.predict(embedded_input_data)

        # class_label = np.argmax(prediction, axis=1)

        # softmax_output = np.exp(prediction) / np.sum(np.exp(prediction), axis=1, keepdims=True)
        # predicted_probabilities = softmax_output[np.arange(len(softmax_output)), class_label]

        # Compute softmax probabilities for the predictions
        softmax_prediction = np.apply_along_axis(lambda x: np.exp(x) / np.sum(np.exp(x)), axis=1, arr=prediction)

        # Get the top-5 indices and corresponding probabilities for each input in the batch
        top_k = 5  # Number of classes to consider
        top_k_indices = np.argsort(softmax_prediction, axis=1)[:, -top_k:]
        top_k_probabilities = np.take_along_axis(softmax_prediction, top_k_indices, axis=1)
        # Print the top-k indices and probabilities for each input in the batch

        listPercent = []
        for i in range(len(top_k_indices)):
            print(f"Input {i}: {top_k} classes with highest probabilities:")
            for j in range(top_k):
                class_idx = top_k_indices[i, j]
                class_prob = top_k_probabilities[i, j]
                print(f"\tClass {class_idx}: {class_prob:.2%}")
                listPercent.append(float(class_prob))

        listPercent.reverse()
        print(listPercent)

        # get list of author top 5
        authors = list(np.argsort(softmax_prediction, axis=1)[:, -5:][0])
        authors.reverse()
        print(authors)
        print("rank 1 is",authors[0])
        print("rank 2 is",authors[1])
        print("rank 3 is",authors[2])
        print("rank 4 is",authors[3])
        print("rank 5 is",authors[4])

        # # Print the predicted class indices and probabilities
        # print(int(predicted_probabilities*100))

        # # print(str(prediction))
        # print(int(class_label))

        try:
            author_1 = db.authors.find({"id": int(authors[0])})
            author_2 = db.authors.find({"id": int(authors[1])})
            author_3 = db.authors.find({"id": int(authors[2])})
            author_4 = db.authors.find({"id": int(authors[3])})
            author_5 = db.authors.find({"id": int(authors[4])})
            data = list(author_1), list(author_2), list(author_3), list(author_4), list(author_5), listPercent

            print(data)
            if (data == []):
                return [{"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}]
            else:
                return dumps(data)
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
    app.run()
