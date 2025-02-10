package handler

import "Call-Manager/libs" // Call functions like utils.<function()>
import (
    "net/http"
)

// - Upon a GET request we will create a 100ms room, and then return the host and guest codes 
//   to the user
//
// Examples:
// GET -> {Host_Code: '<Host code here>', Guest_Code: '<Guest code here>'}

// Entry point into API
func Handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Allow", "OPTIONS, GET")

    // To handle preflight requests we just send nothing in the body with our headers
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
