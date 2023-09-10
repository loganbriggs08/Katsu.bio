package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"katsu.bio/structs"
)

func HandleTags(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Println("Correct method")
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
