#!/usr/bin/env sh

# Abort on errors
set -e

npm run build
cd dist

# Uncomment if deploying to a custom domain
# echo "www.example.com" > CNAME

git init
git add -A
git commit -m "deploy"
git push -f git@github.com:gtumedei/gtumedei.github.io.git master:gh-pages

cd -