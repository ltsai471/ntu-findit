# Development

## NOTICE!!
- 如果有DB相關的問題一定要跟祐琳講!! (欄位看不懂或不知道要填什麼、欄位增刪、必輸欄位取消、pk自動給號 etc.)
- 每個功能都要寫測試文件，包含測試的input、output、例外處理等等

## GIT

- create branch and switch to branch
<code><pre>
git checkout -b "your_branch_name"
</pre></code>

- commit branch
<code><pre>
git commit -a -m "commit_name"
</pre></code>

- if your branch is behind master, merge master to branch
<code><pre>
git checkout master
git pull    //solve conflict if needed
or
git pull oringin remote_branch_name    //solve conflict if needed
git checkout "your_branch_name"
git merge master
</code></pre>

- push branch to remote (\*in your branch)
  <code><pre>
  git push
  </code></pre>
- click merge request and assign reviewer on gitlab

## Coding Style

- Use Camel-Case to name all variables
  - class: use upper-case on the first letter  #e.g. Account
  - attr and function: use lower-case on the first letter  #e.g. itemName
- 換行:
  - 兩個class之間或class與function(同層)之間，請空兩行
  - 同一個class與其下的function之間，請空一行
  - 如果單行的code會長到需要往右捲動，請換行，以不需要往右捲為準
- Format hotkey (vscode): `shift+alt+f`
- Use RESTful API
  - https://ithelp.ithome.com.tw/articles/10194229

## Install Virtual Environment for Django (for Windows 10 ptrhon 3.9)

1. cmd 輸入
<code><pre>
(cd到要裝虛擬環境的目錄 這邊是C:\Envs)
pip install virtualenvwrapper-win
python -m venv sdm_venv
cd C:\Envs\sdm_venv\Scripts
activate
(sdm_venv) C:\>python --version (激活後可以看到前綴有帶 (venv) 的字樣, 可以鍵入 python 試試)
</code></pre>

2. 安裝
   <code><pre>
   pip install django
   python -m django --version
   (使用 4.0.3 版本)
   </code></pre>

3. 測試安裝
   <code><pre>
   cd my_django_environment
   mkdir django_test
   cd django_test
   django-admin startproject mytestsite
   cd mytestsite
   python manage.py runserver
   </code></pre>

4. URL 輸入
   <code><pre>
   http://127.0.0.1:8000/
   </code></pre>
   補充: 虛擬環境指令
   <code><pre>
   deactivate — 退出當前的 Python 虛擬環境
   workon — 列出可用的虛擬環境
   activate 或 workon name_of_environment — 激活指定的 Python 虛擬環境
   workon SDM_environment
   rmvirtualenv name_of_environment — 刪除指定的環境
   </code></pre>

5. install packages from requirements.txt
   <code><pre>
   (install)
   python -m pip install -r requirements.txt
   (save requirements.txt)
   python -m pip freeze > requirements.txt
   </code></pre>

## Launch Django

<code><pre>
(Need to install virtual environment first)
(cd to Envs\sdm_venv)
activate
(cd to NTU_Lost)
python manage.py runserver
(Open link in website)
http://localhost:8000/api/orders/
</code></pre>

## Launch React

<code><pre>
(download node.js)
npm install react
(cd to NTU_Lost\react_frontend)
(To get the latest node_modules)
npm install
(run react.js app)
npm start
(build react app to get /build )
npm run build
</code></pre>

## Migrate model to your PostgreSQL

<code><pre>
(cd to NTU_Lost)
python manage.py makemigrations ntulost
python manage.py migrate
</code></pre>

## Convert *Uint8Array Image* to *JPEG Image* from JSON Request

<code><pre>
import cv2
import numpy as np
from PIL import Image

data = request.json
imageArray = data["image"]

imgBGR = cv2.imdecode(np.array(imageArray, dtype=np.uint8),
                       cv2.IMREAD_COLOR)
imgRGB = cv2.cvtColor(imgBGR, cv2.COLOR_BGR2RGB)
imgRGB = Image.fromarray(imgRGB)
imgRGB.save("save_path/new_image.jpeg")
</code></pre>