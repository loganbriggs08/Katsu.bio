package endpoints

import (
	"encoding/json"
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"

	"katsu.bio/database"
	"katsu.bio/structs"
)

func HandleBlogs(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if r.Header.Get("query") == "" {
			blogResults := database.GetBlogs(r.Header.Get(""))

			BlogList := structs.Blogs{
				BlogResults: blogResults,
			}

			blogResultsMarshal, MarshalError := json.Marshal(BlogList)

			if MarshalError != nil {
				log.Fatal(MarshalError)
			} else {
				w.WriteHeader(http.StatusOK)

				_, WriteError := w.Write(blogResultsMarshal)

				if WriteError != nil {
					log.Fatal(MarshalError)
				}
			}

		} else {
			blogResults := database.GetBlogs(r.Header.Get("query"))

			BlogList := structs.Blogs{
				BlogResults: blogResults,
			}

			blogResultsMarshal, MarshalError := json.Marshal(BlogList)

			if MarshalError != nil {
				log.Fatal(MarshalError)
			} else {
				w.WriteHeader(http.StatusOK)

				_, WriteError := w.Write(blogResultsMarshal)

				if WriteError != nil {
					log.Fatal(MarshalError)
				}
			}
		}

	} else {
		HandleBlogsCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		HandleBlogsCallBackErrorMarshal, MarshalError := json.Marshal(HandleBlogsCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(HandleBlogsCallBackErrorMarshal)

			if WriteError != nil {
				log.Fatal(MarshalError)
			}
		}
	}
}

func CreateBlog(w http.ResponseWriter, r *http.Request) {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	if r.Method == "POST" && r.Header.Get("password") == os.Getenv("DASHBOARD_PASSWORD") {
		fmt.Println("hello")
		newBlogID, _ := database.CreateBlog()
		var created bool

		if newBlogID != "" {
			created = true
		} else {
			created = false
		}

		NewBlogReturnStruct := structs.BlogCreated{
			Created: created,
			BlogID:  newBlogID,
		}

		NewBlogReturnStructMarshal, NewBlogReturnStructMarshalError := json.Marshal(NewBlogReturnStruct)

		if NewBlogReturnStructMarshalError != nil {
			log.Fatal(NewBlogReturnStructMarshalError)
		}

		w.WriteHeader(http.StatusOK)

		_, WriteError := w.Write(NewBlogReturnStructMarshal)

		if WriteError != nil {
			log.Fatal(WriteError)
		}

	} else {
		HandleBlogsUpdateCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		HandleBlogsUpdateCallbackErrorMarshal, MarshalError := json.Marshal(HandleBlogsUpdateCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(HandleBlogsUpdateCallbackErrorMarshal)

			if WriteError != nil {
				log.Fatal(WriteError)
			}
		}
	}
}

func DeleteBlog(w http.ResponseWriter, r *http.Request) {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	if r.Method == "POST" && r.Header.Get("password") == os.Getenv("DASHBOARD_PASSWORD") && r.Header.Get("id") != "" {
		databaseDeleteResult := database.DeleteBlog(r.Header.Get("id"))

		deleteResult := structs.BlogDeleted{
			Deleted: databaseDeleteResult,
		}

		deleteResultMarshal, deleteResultMarshalError := json.Marshal(deleteResult)

		if deleteResultMarshalError != nil {
			log.Fatal(deleteResultMarshalError)
		}

		w.WriteHeader(http.StatusOK)
		_, writeError := w.Write(deleteResultMarshal)

		if writeError != nil {
			log.Fatal(writeError)
		}

	} else {
		HandleBlogsUpdateCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		HandleBlogsUpdateCallbackErrorMarshal, MarshalError := json.Marshal(HandleBlogsUpdateCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(HandleBlogsUpdateCallbackErrorMarshal)

			if WriteError != nil {
				log.Fatal(WriteError)
			}
		}
	}
}

func UpdateBlogs(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		databaseUpdateBlogResult := database.UpdateBlog(r.Header.Get("id"), r.Header.Get("title"), r.Header.Get("description"), r.Header.Get("tag"), r.Header.Get("html"))

		BlogUpdateResult := structs.BlogUpdate{
			Updated: databaseUpdateBlogResult,
		}

		BlogUpdateResultMarshal, BlogUpdateResultMarshalError := json.Marshal(BlogUpdateResult)

		if BlogUpdateResultMarshalError != nil {
			log.Fatal(BlogUpdateResultMarshalError)
		}

		w.WriteHeader(http.StatusOK)
		_, returnResultError := w.Write(BlogUpdateResultMarshal)

		if returnResultError != nil {
			log.Fatal(returnResultError)
		}

	} else {
		HandleBlogsUpdateCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		HandleBlogsUpdateCallbackErrorMarshal, MarshalError := json.Marshal(HandleBlogsUpdateCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(HandleBlogsUpdateCallbackErrorMarshal)

			if WriteError != nil {
				log.Fatal(MarshalError)
			}
		}
	}
}

func HandleBlogsHTML(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		blogHTMLStruct := structs.ReturnHTML{
			BlogHTML: database.GetHTML(r.Header.Get("id")),
		}

		BlogHtmlMarshal, BlogHTMLMarshalError := json.Marshal(blogHTMLStruct)

		if BlogHTMLMarshalError != nil {
			log.Fatal(BlogHTMLMarshalError)
		}
		w.WriteHeader(http.StatusOK)
		_, ReturnWriteError := w.Write(BlogHtmlMarshal)

		if ReturnWriteError != nil {
			log.Fatal(ReturnWriteError)
		}
	} else {
		HandleBlogsHTMLCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		HandleBlogsHTMLCallbackErrorMarshal, MarshalError := json.Marshal(HandleBlogsHTMLCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(HandleBlogsHTMLCallbackErrorMarshal)

			if WriteError != nil {
				log.Fatal(MarshalError)
			}
		}
	}
}
