package main

import (
	"net/http"

	"katsu.bio/endpoints"
)

func main() {
	http.HandleFunc("/api/blogs", endpoints.HandleBlogs)
}
