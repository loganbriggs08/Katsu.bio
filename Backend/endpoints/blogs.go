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
		VideoCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		VideoCallBackErrorMarshal, MarshalError := json.Marshal(VideoCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(VideoCallBackErrorMarshal)

			if WriteError != nil {
				log.Fatal(MarshalError)
			}
		}
	}
}
