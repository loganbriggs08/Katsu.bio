package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"katsu.bio/database"
	"katsu.bio/structs"
)

func HandleBlogs(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if r.Header.Get("blog-query") == "" {
			getBlogsresult := database.GetBlogs(r.Header.Get(""))
			fmt.Println(getBlogsresult)
		} else {
			getBlogsresult := database.GetBlogs(r.Header.Get("blog-query"))
			fmt.Println(getBlogsresult)
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
