# Makefile for the demo server

build-server:
	go build -o build/main

build-web:
	yarn build

watch-server:
	go build -o build/main && ./build/main

watch-web:
	yarn watch

