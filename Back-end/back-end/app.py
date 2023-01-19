from flask import Flask, send_file
import pathlib

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>hello world</h1>'

@app.route('/image/<image_id>')
def image(image_id):
    # code to determine the path of the image based on image_id
    return send_file(pathlib.Path("basleng"+image_id+".jpg").resolve(), mimetype='image/jpg')

if __name__ == '__main__':
    app.run()