PROJECT_DIR   := $(PWD)
CURRENT_USER  := $(shell id -u)
CURRENT_GROUP := $(shell id -g)

NODE_IMAGE    := docker.io/node:14

COMMAND       := docker run --rm --user $(CURRENT_USER):$(CURRENT_GROUP) -v $(PROJECT_DIR):/app:delegated -w /app $(NODE_IMAGE)

install:
	$(COMMAND) npm install

test:
	$(COMMAND) npm test

.PHONY: install test
