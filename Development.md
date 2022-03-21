# Development

## GIT
- create branch and switch to branch
<pre><code>git checkout -b "your_branch_name"
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




