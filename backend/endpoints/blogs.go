package endpoints

import (
	"encoding/json"
	"log"
	"net/http"

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

func HandleBlogsHTML(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		blogHTMLStruct := structs.ReturnHTML{
			BlogHTML: database.GetHTML(r.Header.Get("blog_id")),
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
