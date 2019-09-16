TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=$(strip $(shell cat version))

build: clean init
	@echo "Building static pages..."
	@DEBUG=@arcblock/gatsby-config yarn build
	@rm public/*.js.map

all: build

init:
	@echo "Install npm dependencies required for this repo..."
	@npm install -g gatsby-cli yarn
	@yarn

clean:
	@echo "All cache and build are cleaned."
	@rm -rf public && rm -rf .cache

deploy:
	@echo "Deploy software..."

run:
	@echo "Run software..."
	@yarn start

serve: build
	@echo "Serve software..."
	@yarn serve

travis: init
	@echo "Prepare travis build env"

copy: copy-starter-frontend copy-starter-backend copy-starter-tools

copy-starter-frontend:
	@echo "Copy starter frontend code here..."
	@cp -r ../forge-react-starter/templates/src/components templates/src
	@cp -r ../forge-react-starter/templates/src/hooks templates/src
	@cp -r ../forge-react-starter/templates/src/libs templates/src
	@cp -r ../forge-react-starter/templates/src/pages templates/src
	@rm templates/src/pages/index.js

copy-starter-backend:
	@echo "Copy starter backend code here..."
	@cp -r ../forge-react-starter/api .

copy-starter-tools:
	@echo "Copy starter tools code here..."
	@cp -r ../forge-react-starter/tools .

include .makefiles/*.mk

.PHONY: build init travis-init install dep pre-build post-build all test doc precommit travis clean watch run bump-version create-pr
