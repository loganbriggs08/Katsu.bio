package main

import (
	"katsu.bio/database"
	"katsu.bio/endpoints"
	"log"
	"net/http"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, query")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	if database.Initialize() == true {
		if database.CreateTables() == true {
			http.HandleFunc("/api/blogs", endpoints.HandleBlogs)
			http.HandleFunc("/api/tags", endpoints.HandleTags)

			corsHandler := corsMiddleware(http.DefaultServeMux)

			log.Fatal(http.ListenAndServe(":6969", corsHandler))
		} else {
			log.Fatal("Failed to create tables within the database.")
		}
	} else {
		log.Fatal("Database connection could not be established.")
	}
}
