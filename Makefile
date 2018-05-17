install: install-deps

start:
	npm run nodemon -- --exec npm run babel-node -- server/bin/slack.js

install-deps:
	npm install

build:
	rm -rf dist
	npm run webpack -- -p --env production

test:
	npm test

lint:
	npm run eslint ./app/**/*.jsx ./app/**/*.js

publish:
	git push heroku master
