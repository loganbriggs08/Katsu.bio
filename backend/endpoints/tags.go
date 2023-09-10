package endpoints

import (
	"encoding/json"
	"katsu.bio/database"
	"log"
	"net/http"

	"katsu.bio/structs"
)

func HandleTags(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		ReturnTags := structs.Tags{
			Tags: database.GetAllTags(),
		}

		ReturnTagsMarshal, ReturnTagsMarshalError := json.Marshal(ReturnTags)

		if ReturnTagsMarshalError != nil {
			log.Fatal(ReturnTagsMarshalError)
		} else {
			w.WriteHeader(http.StatusOK)
			_, ResponseWriteError := w.Write(ReturnTagsMarshal)

			if ResponseWriteError != nil {
				log.Fatal(ResponseWriteError)
			}
		}
	} else {
		MethodError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		MethodErrorMarshal, MethodErrorMarshalError := json.Marshal(MethodError)

		if MethodErrorMarshalError != nil {
			log.Fatalln(MethodErrorMarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)
			_, writeResponseError := w.Write(MethodErrorMarshal)

			if writeResponseError != nil {
				log.Fatal(writeResponseError)
			}
		}
	}
}
