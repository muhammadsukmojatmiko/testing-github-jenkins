#! /bin/bash

[ -f .env.production ] && rm .env.production
[ -f .env.local ] && rm .env.local

if [ $1 == 'development' ]
then
  cp .env.base.local .env.local
else
  cp .env.base.$1 .env.production
fi

# Get latest commit sha github.
commitSha=$(git rev-parse --short HEAD)

# Get package.json version.
version=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json)

# Append the commit sha & package version to '.env' file
echo "NEXT_PUBLIC_LATEST_SHA=\"${commitSha}\"" >> .env.local
echo "NEXT_PUBLIC_WEB_VERSION=\"${version}\"" >> .env.local
echo "NEXT_PUBLIC_LATEST_SHA=\"${commitSha}\"" >> .env.production
echo "NEXT_PUBLIC_WEB_VERSION=\"${version}\"" >> .env.production
