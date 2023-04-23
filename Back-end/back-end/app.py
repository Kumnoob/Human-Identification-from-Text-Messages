from flask import Flask, send_file, request, jsonify, make_response
import numpy as np
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import pathlib
import json
from bson.json_util import dumps
from keras.models import load_model
import tensorflow as tf
from gensim.models.doc2vec import Doc2Vec
import nltk
import string
from sklearn.svm import OneClassSVM
from sklearn.metrics import accuracy_score
import os
from joblib import load
from scipy.special import softmax
import firebase_admin
from firebase_admin import credentials


nltk.download('punkt')
print("tensorflow is running in version:", tf.__version__)

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://phlpat:Pat12485@cluster0.hm4z34c.mongodb.net/test')
db = client.mydb


@app.route('/')
@cross_origin()
def hello():
    return "Identification from Text Messages"

# test flask


@app.route('/image/<image_id>')
@cross_origin()
def image(image_id):
    # code to determine the path of the image based on image_id
    return send_file(pathlib.Path("basleng"+image_id+".jpg").resolve(), mimetype='image/jpg')

@app.route('/organizer/<organizer_id>')
@cross_origin()
def organizer(organizer_id):
    # code to determine the path of the image based on image_id
    return send_file(pathlib.Path(organizer_id+".jpg").resolve(), mimetype='image/jpg')

# POST METHOD
@app.route('/search', methods=['POST'])
@cross_origin()
def predict():
    if request.method == 'POST':
        body = request.get_json()
        print(body)
        model_type = body["model"]
        null = ""
        input_string = body["message"]
        match model_type:
            case "Model1":
                lstm_model = load_model('lstm_model_001.h5')
                doc2vec_model = Doc2Vec.load('doc2vec_001_model.bin')
                print("message", input_string)
                
                text = input_string.translate(str.maketrans('', '', string.punctuation))
                
                text = text.lower()

                preprocessed_string = nltk.word_tokenize(text)

                doc_vector = doc2vec_model.infer_vector(preprocessed_string)
                doc_vector = np.reshape(doc_vector, (1, 1, 300))
                print(doc_vector)

                prediction = lstm_model.predict(doc_vector)

                print("prediction: ", prediction)
                predicted_class_idx = np.argmax(prediction)
                print(predicted_class_idx)

                softmax_prediction = np.apply_along_axis(lambda x: np.exp(x) / np.sum(np.exp(x)), axis=1, arr=prediction)

                top_k = 5 
                top_k_indices = np.argsort(softmax_prediction, axis=1)[:, -top_k:]
                top_k_probabilities = np.take_along_axis(softmax_prediction, top_k_indices, axis=1)

                listPercent = []
                for i in range(len(top_k_indices)):
                    for j in range(top_k):
                        class_idx = top_k_indices[i, j]
                        class_prob = top_k_probabilities[i, j]
                        listPercent.append(float(class_prob))

                listPercent.reverse()

                # get list of author top 5
                authors = list(np.argsort(softmax_prediction, axis=1)[:, -5:][0])
                authors.reverse()

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
            case "Model2":
                model_folder = 'svm_model'
                models = {}
                d2v_model = Doc2Vec.load("doc2vec_svm.bin")

                # Loop over all model files in the folder
                for filename in os.listdir(model_folder):
                    model_path = os.path.join(model_folder, filename)
                    models[filename] = load(model_path)
                print(models)

                # Remove punctuation
                text = input_string.translate(str.maketrans('', '', string.punctuation))
                
                # Convert to lowercase
                text = text.lower()
                
                # Tokenize into words
                preprocessed_string = nltk.word_tokenize(text)

                vector = d2v_model.infer_vector(preprocessed_string)
                scores = {}
                probs = {}
                for label in models:
                    model = models[label]
                    score = model.decision_function([vector])[0]
                    scores[label] = score
                    prob = 100 / (1 + np.exp(-score))
                    probs[label] = prob
                print(probs)
                top_labels = sorted(probs, key=lambda x: probs[x], reverse=True)[:5]



                for i in range(len(top_labels)):
                    top_labels[i] = str(top_labels[i])[len("model_"):-len(".pkl")]
                print(top_labels)

                try:
                    author_1 = db.authors.find({"label": str(top_labels[0])})
                    author_2 = db.authors.find({"label": str(top_labels[1])})
                    author_3 = db.authors.find({"label": str(top_labels[2])})
                    author_4 = db.authors.find({"label": str(top_labels[3])})
                    author_5 = db.authors.find({"label": str(top_labels[4])})
                    data = list(author_1), list(author_2), list(author_3), list(author_4), list(author_5), [1,1,1,1,1]

                    # print(data)
                    if (data == []):
                        return [{"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}, {"id": "", "name": "", "text": ""}]
                    else:
                        return dumps(data)
                except ValueError:
                    pass

    return {"log": "message is being processed", "id": null}, 201


@app.route('/preview', methods=['GET'])
@cross_origin()
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
@cross_origin()
def example():
    print("example works")
    if request.method == 'GET':
        try:
            collection = client['mydb']['examples']
            print(collection)
            # Execute the aggregation pipeline
            randExample = []
            for i in range(1,110):
                pipeline = [
                    { "$match": { "id": i } },
                    { "$sample": { "size": 1} }
                ]
                print("i ",i)
                res = list(collection.aggregate(pipeline))
                randExample.append(res)

            # print(randExample)
            response = make_response(dumps(randExample), 201)
            print(response)
            return response
        except ValueError:
            pass

if __name__ == '__main__':
    app.run()
