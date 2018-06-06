install: install-deps

start:
	npm run nodemon -- --exec npm run babel-node -- dist/bin/slack.js

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

lint:
	npm run eslint --ext ".jsx" .

publish:
	git push heroku master
