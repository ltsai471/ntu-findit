# Development

## GIT
- create branch and switch to branch
<code><pre>
git checkout -b "your_branch_name"
</pre></code>

- commit branch
<code><pre>
git add "file_or_folder"
git commit -am "commit_name"
</code></pre>

- if your branch is behind master, merge master to branch
<code><pre>
git checkout master
git pull    //solve conflict if needed
git checkout "your_branch_name"
git merge master
</code></pre>

- push branch to remote (*in your branch)
<code><pre>
git push
</code></pre>
- click merge request and assign reviewer on gitlab

## Coding Style
- Use Camel-Case to name all variables
  - class: use upper-case on the first letter  #e.g. Account
  - attr and function: use lower-case on the first letter  #e.g. itemName

## Install Virtual Environment for Django (for Windows 10 ptrhon 3.9)
1. cmd 輸入
<code><pre>
(cd到要裝虛擬環境的目錄 這邊是C:\Envs)
pip install virtualenvwrapper-win
python -m venv sdm_venv
cd C:\Envs\sdm_venv\Scripts
activate
(sdm_venv) C:\>python (激活後可以看到前綴有帶 (venv) 的字樣, 可以鍵入 python 試試)
</code></pre>

2. 安裝
<code><pre>
pip install django
python -m django --version
(使用4.0.3版本)
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

4. URL輸入
```
http://127.0.0.1:8000/

補充: 虛擬環境指令
deactivate — 退出當前的Python虛擬環境
workon — 列出可用的虛擬環境
activate 或 workon name_of_environment — 激活指定的Python虛擬環境
workon SDM_environment
rmvirtualenv name_of_environment — 刪除指定的環境
```

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
npm start
</code></pre>

## Migrate model to your PostgreSQL
<code><pre>
(cd to NTU_Lost)
python manage.py makemigrations ntulost
python manage.py migrate
</code></pre>