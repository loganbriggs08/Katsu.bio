package main

import (
	"katsu.bio/database"
	"katsu.bio/endpoints"
	"log"
	"net/http"
)

func main() {
	if database.Initialize() == true {
		if database.CreateTables() == true {
			http.HandleFunc("/api/blogs", endpoints.HandleBlogs)

			log.Fatal(http.ListenAndServe(":6969", nil))
		} else {
			log.Fatal("Failed to create tables within the database.")
		}
	} else {
		log.Fatal("Database connection could not be established.")
	}
}
