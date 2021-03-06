TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=$(strip $(shell cat version))

build:
	@echo "Building the software..."

init: install dep
	@echo "Initializing the repo..."

travis-init: install dep
	@echo "Initialize software required for travis (normally ubuntu software)"

install:
	@echo "Install software required for this repo..."
	@npm install -g yarn

dep:
	@echo "Install dependencies required for this repo..."
	@yarn

pre-build: install dep
	@echo "Running scripts before the build..."

post-build:
	@echo "Running scripts after the build is done..."

all: pre-build build post-build

test:
	@echo "Running test suites..."

lint:
	@echo "Linting the software..."
	@yarn lint

doc:
	@echo "Building the documenation..."

precommit: dep lint doc build test

travis: precommit

travis-deploy:
	@echo "Deploy the software by travis"

clean:
	@echo "Cleaning the build..."

run:
	@echo "Running the software..."
	@yarn start

copy: copy-starter-frontend copy-starter-backend copy-starter-tools

copy-starter-frontend:
	@echo "Copy starter frontend code here..."
	@cp -r ../forge-react-starter/templates/src/components templates/src
	@cp -r ../forge-react-starter/templates/src/libs templates/src
	@cp -r ../forge-react-starter/templates/src/pages templates/src

copy-starter-backend:
	@echo "Copy starter backend code here..."
	@cp -r ../forge-react-starter/api .

copy-starter-tools:
	@echo "Copy starter tools code here..."
	@cp -r ../forge-react-starter/tools .

include .makefiles/*.mk

.PHONY: copy build init travis-init install dep pre-build post-build all test doc precommit travis clean watch run bump-version create-pr
