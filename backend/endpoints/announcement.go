package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"katsu.bio/structs"
)

var announcementMessage string

func HandleAnnouncement(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" || r.Method == "GET" {
		if r.Method == "GET" {
			ReturnCallbackError := structs.AnnouncementResult{
				AnnouncementMessage: announcementMessage,
				Updated:             false,
			}

			CallbackAnnouncementMarshal, MarshalError := json.Marshal(ReturnCallbackError)

			if MarshalError != nil {
				log.Fatal(MarshalError)
			} else {
				w.WriteHeader(http.StatusOK)

				_, WriteError := w.Write(CallbackAnnouncementMarshal)

				if WriteError != nil {
					log.Fatal(MarshalError)
				}
			}
		} else {
			if r.Header.Get("password") == os.Getenv("DASHBOARD_PASSWORD") {
				announcementMessage = r.Header.Get("announcement")
				fmt.Println(announcementMessage)

				ReturnCallbackError := structs.AnnouncementResult{
					AnnouncementMessage: announcementMessage,
					Updated:             true,
				}

				CallbackAnnouncementMarshal, MarshalError := json.Marshal(ReturnCallbackError)

				if MarshalError != nil {
					log.Fatal(MarshalError)
				} else {
					w.WriteHeader(http.StatusOK)

					_, WriteError := w.Write(CallbackAnnouncementMarshal)

					if WriteError != nil {
						log.Fatal(MarshalError)
					}
				}
			}
		}
	} else {
		ReturnCallbackError := structs.Error{
			ErrorCode:    http.StatusMethodNotAllowed,
			ErrorMessage: "Method used is not accepted at this Endpoint.",
		}

		CallbackErrorMarshal, MarshalError := json.Marshal(ReturnCallbackError)

		if MarshalError != nil {
			log.Fatal(MarshalError)
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)

			_, WriteError := w.Write(CallbackErrorMarshal)

			if WriteError != nil {
				log.Fatal(MarshalError)
			}
		}
	}
}
