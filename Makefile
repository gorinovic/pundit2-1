REPORTER = spec

all: clean docs test-cov test
	
test:
	@NODE_ENV=test \
	./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	-u tdd \
	./test/test-node.js \

lib-cov:
	@rm -rf cov/*
	./node_modules/.bin/jscoverage src cov --exclude tmpl
	cp -R src/tmpl cov/tmpl
	@echo "[Pundit] Generated jscoverage sources"
	@sed 's%/\*COV\*/%coverage=true;%g' test/index.html > cov/test-cov.html
	
test-cov: lib-cov 
	@COVERAGE=1 \
	$(MAKE) test REPORTER=html-cov > cov/tests-coverage.html_foo
	@sed 's%</style>%</style><link rel="stylesheet" type="text/css" href="pundit_coverage.css">%g' cov/tests-coverage.html_foo > cov/tests-coverage.html
	@cp bin/pundit_coverage.css cov
	@rm cov/tests-coverage.html_foo
	@echo "[Pundit] END: generated jscoverage static html files"

test-coveralls: lib-cov
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@COVERAGE=1 \
	$(MAKE) test REPORTER=mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js

docs:
	./bin/build_docs.sh

docs-lint: 
	./bin/build_docs.sh lint

clean:
	rm -rf cov docs dist
	@echo "[Pundit] cleaned up everything"

hello:
	npm install
	@echo "[Pundit] installed nodejs dependencies"

.PHONY: test test-cov live-cov docs docs-lint clean hello