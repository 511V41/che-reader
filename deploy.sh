#!/bin/bash
yarn clean
yarn build
git subtree push --prefix dist/ origin gh-pages