package handler

import "Call-Manager/libs"
import (
	"net/http"
)

// Entry point
func Handler(w http.ResponseWriter, r *http.Request) {
	// Settings CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Allow", "POST, OPTIONS, GET")

	// Handle OPTIONS preflight request
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

    // Handle GET requests, create room then return host and guest codes
    if r.Method == http.MethodGet {
    	Room_Id, _ := utils.Create_Room()
        utils.Get_Room_Code_HTTP(&w, Room_Id)
    }
}
