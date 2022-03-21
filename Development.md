# Development

## GIT
- create branch and switch to branch
'''
git checkout -b "your_branch_name"
'''
- commit branch
'''
git add "file_or_folder"
git commit -am "commit_name"
'''
- if your branch is behind master, merge master to branch
'''
git checkout master
git pull
'''
    - solve conflict if needed
'''
git checkout "your_branch_name"
git merge master
'''
- push branch to remote (*in your branch)
'''
git push
'''
- click merge request and assign reviewer on gitlab




