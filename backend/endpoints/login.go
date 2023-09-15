package endpoints

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"katsu.bio/structs"
)

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		}

		fmt.Println("Received Headers:")

		for key, values := range r.Header {
			for _, value := range values {
				fmt.Printf("%s: %s\n", key, value)
			}
		}

		fmt.Println(os.Getenv("DASHBOARD_USERNAME"), os.Getenv("DASHBOARD_PASSWORD"))
		fmt.Println(r.Header.Get("username"), r.Header.Get("password"))
		fmt.Println(r.Header.Get("abc"))

		if r.Header.Get("username") == os.Getenv("DASHBOARD_USERNAME") && r.Header.Get("password") == os.Getenv("DASHBOARD_PASSWORD") {
			dashboardLoginStruct := structs.LoginResult{
				LoginSuccess: true,
			}

			dashboardLoginStructMarshal, dashboardLoginStructError := json.Marshal(dashboardLoginStruct)

			if dashboardLoginStructError != nil {
				log.Fatal(dashboardLoginStructError)
			}

			w.WriteHeader(http.StatusOK)
			_, responseError := w.Write(dashboardLoginStructMarshal)

			if responseError != nil {
				log.Fatal(responseError)
			}
		} else {
			dashboardLoginStruct := structs.LoginResult{
				LoginSuccess: false,
			}

			dashboardLoginStructMarshal, dashboardLoginStructError := json.Marshal(dashboardLoginStruct)

			if dashboardLoginStructError != nil {
				log.Fatal(dashboardLoginStructError)
			}

			w.WriteHeader(http.StatusForbidden)
			_, responseError := w.Write(dashboardLoginStructMarshal)

			if responseError != nil {
				log.Fatal(responseError)
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
