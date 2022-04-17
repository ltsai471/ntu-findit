import os
from flask import Flask, request, redirect, url_for, Response
from werkzeug.utils import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = './images'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB


@app.route('/', methods=['POST'])
def upload_file():
    file = request.files['image']
    # image = request.FILES.get("image", False)
    if file:
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
        print(request.form.to_dict())
        return Response("success", status=200, mimetype='application/json')
    else:
        return Response("fail", status=400, mimetype='application/json')
