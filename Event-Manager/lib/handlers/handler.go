package handlers

import (
    "Event-Manager/lib/models"
    "Event-Manager/lib/utils"
    "encoding/json"
    "fmt"
    "net/http"
    "strconv"
)

const (
    MAX_EVENTS = 500
    MAX_TITLE_LENGTH = 50
    MAX_DESCRIPTION_LENGTH = 200
    MAX_USER_ID_LENGTH = 255
)

// Main handler function that routes requests based on HTTP method
func Handler(w http.ResponseWriter, r *http.Request) {
    // Set response header to JSON
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
	    case "POST":
	        Handle_Get_Events(w, r)

	    case "PUT":
	        Handle_Add_Event(w, r)

	    case "DELETE":
	        Handle_Delete_Event(w, r)

	    default:
	        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

// Handle getting all events for a user
func Handle_Get_Events(w http.ResponseWriter, r *http.Request) {
    // Get User_Id from request header
    User_Id := r.Header.Get("User_Id")
    if User_Id == "" {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }

    // Get events for user
    Events, err := utils.Get_Events(User_Id)
    if err != nil {
        http.Error(w, "Failed to get events: "+err.Error(), http.StatusInternalServerError)
        return
    }

    fmt.Fprint(w, Events)
}

// Handle adding a new event
func Handle_Add_Event(w http.ResponseWriter, r *http.Request) {
    // Get User_Id from request header
    User_Id := r.Header.Get("User_Id")
    if User_Id == "" {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }

    // Check event count
    Event_Count, err := utils.Get_Event_Count(User_Id)
    if err != nil {
        http.Error(w, "Failed to get event count: "+err.Error(), http.StatusInternalServerError)
        return
    }

    // Enforce event limit
    if Event_Count >= MAX_EVENTS {
        http.Error(w, "Maximum event limit reached", http.StatusForbidden)
        return
    }

    // Parse JSON body into Event struct
    var New_Event models.Event
    if err := json.NewDecoder(r.Body).Decode(&New_Event); err != nil {
        http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
        return
    }

    // Override the User_Id from JSON with the one from header for security
    New_Event.User_ID = User_Id

    // Validate required fields
    if New_Event.Title == "" || New_Event.Description == "" || New_Event.Date.IsZero() {
        http.Error(w, "Title, Description, and Date are required", http.StatusBadRequest)
        return
    }

    // Validate field lengths
    if len(New_Event.Title) > MAX_TITLE_LENGTH {
        http.Error(w, fmt.Sprintf("Title must not exceed %d characters", MAX_TITLE_LENGTH), http.StatusBadRequest)
        return
    }

    if len(User_Id) > MAX_USER_ID_LENGTH {
        http.Error(w, fmt.Sprintf("User ID must not exceed %d characters", MAX_USER_ID_LENGTH), http.StatusBadRequest)
        return
    }

    if len(New_Event.Description) > MAX_DESCRIPTION_LENGTH {
        http.Error(w, fmt.Sprintf("Description must not exceed %d characters", MAX_DESCRIPTION_LENGTH), http.StatusBadRequest)
        return
    }

    // Add event to database
    err = utils.Add_Event(New_Event)
    if err != nil {
        http.Error(w, "Failed to add event: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    fmt.Fprint(w, "Event created successfully")
}

// Handle deleting an event
func Handle_Delete_Event(w http.ResponseWriter, r *http.Request) {
    // Get Event_Id and User_Id from headers
    Event_Id := r.Header.Get("Event_Id")
    User_Id := r.Header.Get("User_Id")

    if Event_Id == "" || User_Id == "" {
        http.Error(w, "Event ID and User ID are required", http.StatusBadRequest)
        return
    }

    // Convert Event_Id to int
    Event_Id_Int, err := strconv.Atoi(Event_Id)
    if err != nil {
        http.Error(w, "Invalid event ID", http.StatusBadRequest)
        return
    }

    // Delete event
    err = utils.Delete_Event(Event_Id_Int, User_Id)
    if err != nil {
        http.Error(w, "Failed to delete event: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    fmt.Fprint(w, "Event deleted successfully")
}
