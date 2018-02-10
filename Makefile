IMAGE := node:9.5.0-alpine

build:
	docker run $(IMAGE) yarn build
