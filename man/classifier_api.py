from flask import Flask, request, jsonify
import pickle
from skimage.io import imread
from skimage.transform import resize
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = pickle.load(open('./classifier.p', 'rb'))
categories = ['brown-glass', 'copper', 'green-glass', 'plastic', 'white-glass']

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    img = imread(file)
    img = resize(img, (15, 15))
    img_flattened = img.flatten().reshape(1, -1)
    
    prediction = model.predict(img_flattened)
    predicted_category = categories[prediction[0]]
    
    return jsonify({'category': predicted_category})

if __name__ == '__main__':
    app.run(port=5000)
