# Place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init
git checkout -B main
git add -A
git commit -m "deploy"

# If you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# If you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f  git@github.com:siddharthkumarjha/minor_project.git main:gh-pages
# git subtree push --prefix dist origin gh-pages
# git push origin `git subtree split --prefix dist main`:gh-pages --force

cd -
