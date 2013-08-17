all: lint test

test:
	node test/mocha-runner.js

test-cov: lib-cov
	SPAM_COV=1 \
		MOCHA_REPORTER=html-cov \
		node test/mocha-runner > coverage.html

lib-cov:
	jscoverage lib lib-cov

lint:
	./node_modules/.bin/jshint \
		--verbose \
		index.js \
		lib/*.js \
		test/**/*.js

.PHONY: all test test-cov lint
