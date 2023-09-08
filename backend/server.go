package main

import (
	"log"
	"net/http"

	"katsu.bio/database"
	"katsu.bio/endpoints"
)

func main() {
	if database.Initalise() == true {
		http.HandleFunc("/api/blogs", endpoints.HandleBlogs)

		log.Fatal(http.ListenAndServe(":6969", nil))
	} else {
		log.Fatal("Database connection could not be established.")
	}
}
