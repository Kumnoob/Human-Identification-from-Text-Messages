from flask import Flask, send_file, request
from flask_cors import CORS
from pymongo import MongoClient
import pathlib


app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('localhost', 27017)
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
        messages.append(body)

        message = body["message"]
        messages.pop()
        
        try:
            authors = db.authors.find({'id': int(message)})
            for author in authors:
                for key, value in author.items():
                    if (key == 'name'):
                        return {"body": value, "id": message},201
        except ValueError:
            pass
    
    return {"log": "message is being processed", "body": null}, 201


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