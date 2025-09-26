#!/bin/bash 
set -e
TMP_DIR=$(mktemp -d)
git clone https://github.com/mnsdojo/init-ts.git "$TMP_DIR"
cd "$TMP_DIR"
npm install
npm run build
npm link
echo "✅ init-ts CLI installed globally!"
