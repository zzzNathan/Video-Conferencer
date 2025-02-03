package handler

import (
	"Event-Manager/internal/handlers"
	"net/http"
)

// - Upon a POST request we will return all of a user's events in JSON format
// - Upon a PUT request we will add an event to the DB, users can add up to 500 events
// - Upon a DELETE request we will delete the event with a given event id
//
// Examples:
// POST Header = {User_Id: "f21kj"} -> JSON object with all of user "f21kj"'s events
//
// PUT
//  Header = {User_Id: "12r21"}
//  Data = {
//    Title: "...",
//    Description: "...",
//    Date: "..." // YYYY-MM-DD fomat
// } -> Adds this event to the DB
//
// DELETE Header = {User_Id: "123", Event_Id: 1} -> Deletes event id 1 from our DB

// Entry point
func Handler(w http.ResponseWriter, r *http.Request) {
    handlers.Handler(w, r)
}
