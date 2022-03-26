# Development

## GIT
- create branch and switch to branch
<pre><code>
git checkout -b "your_branch_name"
</code></pre>

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
  - class: Account #use upper-case on the first letter
  - attr and function: itemName #use lower-case on the first letter

## Install Virtual Environment for Django
1. cmd 輸入
pip3 install virtualenvwrapper-win
mkvirtualenv my_django_environment
(實際目錄)
C:\Users\oplab\Envs\my_django_environment
(venv) 
C:\>python (激活後可以看到前綴有帶 (venv) 的字樣, 可以鍵入 python 試試)

2. 安裝
pip3 install django
python -m django --version
(使用4.0.2版本)

3. 測試安裝
cd my_django_environment
mkdir django_test
cd django_test
django-admin startproject mytestsite
cd mytestsite
python manage.py runserver

4. URL輸入
http://127.0.0.1:8000/

補充: 虛擬環境指令
deactivate — 退出當前的Python虛擬環境
workon — 列出可用的虛擬環境
workon name_of_environment — 激活指定的Python虛擬環境
workon SDM_environment
rmvirtualenv name_of_environment — 刪除指定的環境


## Launch Django
<code><pre>
(Need to install virtual environment first)

(cd to Envs)
workon <environment_name>
(cd to NTU_Lost)
python manage.py runserver
http://localhost:8000/api/orders/
</code></pre>

## Launch React
<code><pre>
(cd to NTU_Lost\react_frontend)
npm start
</code></pre>

## Migrate model to your PostgreSQL
<code><pre>
(cd to NTU_Lost)
python manage.py makemigrations ntulost
python manage.py migrate
</code></pre>