from flask import Flask, send_file, request, jsonify
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
from gensim.models.doc2vec import Doc2Vec
import nltk
import string

nltk.download('punkt')
lstm_model = load_model('lstm_model_001.h5')
doc2vec_model = Doc2Vec.load('doc2vec_001_model.bin')

# syn1neg_weights = np.load('doc2vec_001_model.bin.syn1neg.npy')
# dv_vectors = np.load('doc2vec_001_model.bin.dv.vectors.npy')
# wv_vectors = np.load('doc2vec_001_model.bin.wv.vectors.npy')
# doc2vec_model.wv.vectors = wv_vectors
# doc2vec_model.syn1neg = syn1neg_weights
# doc2vec_model.docvecs.vectors_docs = dv_vectors

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

@app.route('/organizer/<organizer_id>')
def organizer(organizer_id):
    # code to determine the path of the image based on image_id
    return send_file(pathlib.Path(organizer_id+".jpg").resolve(), mimetype='image/jpg')

# POST METHOD
@app.route('/search', methods=['POST'])
def predict():
    null = ""
    if request.method == 'POST':
        body = request.get_json()
        print(body)
        input_string = body["message"]
        print("message", input_string)
        # Example input string

        # Remove punctuation
        text = input_string.translate(str.maketrans('', '', string.punctuation))
        
        # Convert to lowercase
        text = text.lower()
        
        # Tokenize into words
        preprocessed_string = nltk.word_tokenize(text)

        doc_vector = doc2vec_model.infer_vector(preprocessed_string)
        doc_vector = np.reshape(doc_vector, (1, 1, 300))
        print(doc_vector)

        # # Initialize a tokenizer with a vocabulary size of 1000
        # tokenizer = Tokenizer(num_words=1000)

        # # Fit the tokenizer on the input string
        # tokenizer.fit_on_texts([input_string])

        # # Convert the input string to a sequence of integers
        # input_sequence = tokenizer.texts_to_sequences([input_string])

        # # Pad the sequence to length 100 (if it is shorter than 100) or truncate it (if it is longer than 100)
        # max_sequence_length = 1
        # padded_input_sequence = pad_sequences(
        #     input_sequence, maxlen=max_sequence_length, padding='post', truncating='post')

        # # Convert the padded sequence to a NumPy array
        # input_data = np.array(padded_input_sequence)

        # doc_vector = tf.constant(doc_vector, dtype=tf.int32)

        # valid_indices = tf.logical_and(doc_vector >= 0, doc_vector < 1000)
        # fixed_indices = tf.where(valid_indices, doc_vector, tf.fill(tf.shape(doc_vector), 0))
        # # Embed the input data using an embedding layer with 300 dimensions
        # from keras.layers import Embedding, Reshape
        # embedding_layer = Embedding(
        #     input_dim=1000, output_dim=300, input_length=1)
        # embedded_input_data = embedding_layer(fixed_indices)

        # reshaped_input_data = Reshape((1, 300))(embedded_input_data)
        
        # print("output data: ",reshaped_input_data)

        # Make predictions on the embedded input data
        prediction = lstm_model.predict(doc_vector)

        print("prediction: ", prediction)
        predicted_class_idx = np.argmax(prediction)
        print(predicted_class_idx)
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
            # print(f"Input {i}: {top_k} classes with highest probabilities:")
            for j in range(top_k):
                class_idx = top_k_indices[i, j]
                class_prob = top_k_probabilities[i, j]
                # print(f"\tClass {class_idx}: {class_prob:.2%}")
                listPercent.append(float(class_prob))

        listPercent.reverse()
        # print(listPercent)

        # get list of author top 5
        authors = list(np.argsort(softmax_prediction, axis=1)[:, -5:][0])
        authors.reverse()
        # print(authors)
        # print("rank 1 is",authors[0])
        # print("rank 2 is",authors[1])
        # print("rank 3 is",authors[2])
        # print("rank 4 is",authors[3])
        # print("rank 5 is",authors[4])

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

            # print(data)
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
            res = list(authors)
            # print(res)
            return dumps(res), 201
        except ValueError:
            pass


@app.route('/example', methods=['GET'])
def example():
    if request.method == 'GET':
        try:
            collection = client['mydb']['examples']
    
            # Execute the aggregation pipeline
            randExample = []
            for i in range(1,110):
                pipeline = [
                    { "$match": { "id": i } },
                    { "$sample": { "size": 1} }
                ]
                res = list(collection.aggregate(pipeline))
                randExample.append(res)

            # print(randExample)
            return dumps(randExample), 201
        except ValueError:
            pass
        
if __name__ == '__main__':
    app.run()
