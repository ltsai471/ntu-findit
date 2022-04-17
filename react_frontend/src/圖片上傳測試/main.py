import os
from flask import Flask, request, redirect, url_for, Response
from werkzeug.utils import secure_filename
from flask_cors import CORS
import cv2
from PIL import Image
import numpy as np

UPLOAD_FOLDER = './images'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB


@app.route('/', methods=['POST'])
def upload_file():
    # file = request.files['image']
    data = request.json
    time = data["time"]
    location = data["location"]
    category = data["category"]
    description = data["description"]
    imageArray = data["image"]
    print(time, location, category, description, len(imageArray))
    imgBGR = cv2.imdecode(np.array(imageArray, dtype=np.uint8),
                       cv2.IMREAD_COLOR)
    imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
    imgRGB = Image.fromarray(imgRGB)
    imgRGB.save(os.path.join(app.config['UPLOAD_FOLDER'], "tempFile.jpeg"))
    return Response("success", status=200, mimetype='application/json')
    # image = request.FILES.get("image", False)
    # if file:
    #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    #     print(request.form.to_dict())
    #     return Response("success", status=200, mimetype='application/json')
    # else:
    #     return Response("fail", status=400, mimetype='application/json')
