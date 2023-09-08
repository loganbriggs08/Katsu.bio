package main

import (
	"log"
	"net/http"

	"katsu.bio/endpoints"
)

func main() {
	http.HandleFunc("/api/blogs", endpoints.HandleBlogs)

	log.Fatal(http.ListenAndServe(":6969", nil))
}
