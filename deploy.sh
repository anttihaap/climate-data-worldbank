#!/bin/sh
cd client
npm run build
mkdir -p ../client-build
cp -r build ../client-build
