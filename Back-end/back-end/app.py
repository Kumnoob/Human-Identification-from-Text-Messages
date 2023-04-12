from flask import Flask, send_file, request, jsonify
import numpy as np
from flask_cors import CORS
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


nltk.download('punkt')
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

                # Make predictions on the embedded input data
                prediction = lstm_model.predict(doc_vector)

                print("prediction: ", prediction)
                predicted_class_idx = np.argmax(prediction)
                print(predicted_class_idx)

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
