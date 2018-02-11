package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/bcokert/TermTree/packages/go/graph"
	_http "github.com/bcokert/TermTree/packages/go/http"
)

func main() {
	indexTemplate, err := ioutil.ReadFile("packages/go/http/index.template.html")
	if err != nil {
		log.Printf("Failed to load template %s: %v", "packages/go/http/index.template.html", err)
		return
	}

	notFoundTemplate, err := ioutil.ReadFile("packages/go/http/404.template.html")
	if err != nil {
		log.Printf("Failed to load template %s: %v", "404.template.html", err)
		return
	}

	schema, err := graph.CreateTermSchema()
	if err != nil {
		log.Printf("Failed to start server: %v", err)
		return
	}

	router := http.NewServeMux()
	router.Handle("/", http.StripPrefix("/", &indexHandler{IndexTemplate: indexTemplate, NotFoundTemplate: notFoundTemplate}))
	router.Handle("/static/", http.StripPrefix("/static/", &staticHandler{AssetDir: "build/static/"}))
	router.Handle("/graph/", http.StripPrefix("/graph/", _http.CreateHandler(schema, true)))

	loggingRouter := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s %q\n", r.Method, r.URL)
		router.ServeHTTP(w, r)
	})

	fmt.Printf("Serving on http://localhost:8911/\n")
	fmt.Printf("%v", http.ListenAndServe(":8911", loggingRouter))
}

type indexHandler struct {
	IndexTemplate    []byte
	NotFoundTemplate []byte
}

func (h *indexHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	switch r.URL.Path {
	case "":
		h.GetIndex(w)
	default:
		h.NotFound(w, r)
	}
}

func (h *indexHandler) GetIndex(w http.ResponseWriter) {
	w.Header().Add("Content-Type", "text/html")
	fmt.Fprintf(w, string(h.IndexTemplate), "main.js")
}

func (h *indexHandler) NotFound(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	w.Header().Add("Content-Type", "text/html")
	fmt.Fprintf(w, string(h.NotFoundTemplate), r.URL.Path)
}

type staticHandler struct {
	AssetDir string
}

func (h *staticHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, h.AssetDir+r.URL.Path)
}
