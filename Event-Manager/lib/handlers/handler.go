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

// Main handler function that routes requests based on HTTP method,
// see events.go for further details.
func Handler(w http.ResponseWriter, r *http.Request) {
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

// Get all of a user's events and return them in JSON format all via HTTP response
func Handle_Get_Events(w http.ResponseWriter, r *http.Request) {
    // Get User_Id from request header, If User_Id isn't found in the header
    // then the request is of an incorrect format
    User_Id := r.Header.Get("User_Id")
    if User_Id == "" {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }

    Events, err := utils.Get_Events(User_Id)

    fmt.Fprint(w, Events)
}

// Add a new event to the DB and return a HTTP response, users cant add more than 500 events
func Handle_Add_Event(w http.ResponseWriter, r *http.Request) {
    // Get User_Id from request header, If User_Id isn't found in the header
    // then the request is of an incorrect format
    User_Id := r.Header.Get("User_Id")
    if User_Id == "" {
        http.Error(w, "User ID is required", http.StatusBadRequest)
        return
    }
    
    // If the user has >= 500 events then we restrict them from adding more events.
    Event_Count, err := utils.Get_Event_Count(User_Id)
    
    if Event_Count >= MAX_EVENTS {
        http.Error(w, "Maximum event limit reached", http.StatusForbidden)
        return
    }

    // Parse JSON body into an Event struct
    var New_Event models.Event

    // Check whether or not proper JSON format was given
    err := json.NewDecoder(r.Body).Decode(&New_Event)
    if err != nil {
        http.Error(w, "Invalid request body: "+err.Error(), http.StatusBadRequest)
        return
    }

    // Override the User_Id from JSON with the one from header for security
    New_Event.User_ID = User_Id

    // Validate the required fields, each event is of the following structure:
    // 
    // Event
    // ------
    // User id, string  (cant be empty or be too long)
    // Event id, serial (automatically assings a number, used as a primary key)
    // Title, string    (cant be empty or be too long)
    // Description, string (cant be empty or be too long)
    // Date, date       (cant be empty)
    if New_Event.Title == "" || New_Event.Description == "" || New_Event.Date.IsZero() {
        http.Error(w, "Title, Description, and Date are required", http.StatusBadRequest)
        return
    }

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

    err = utils.Add_Event(New_Event)

    w.WriteHeader(http.StatusCreated)
    fmt.Fprint(w, "Event created successfully")
}

// Delete an event, given it's user id and event id, then return a HTTP response
func Handle_Delete_Event(w http.ResponseWriter, r *http.Request) {
    Event_Id := r.Header.Get("Event_Id")
    User_Id  := r.Header.Get("User_Id")

    if Event_Id == "" || User_Id == "" { 
        http.Error(w, "Event ID and User ID are required", http.StatusBadRequest)
        return
    }

    // Convert Event_Id to int, as this is how it's represented in the db
    Event_Id_Int, err := strconv.Atoi(Event_Id)
    if err != nil {
        http.Error(w, "Invalid event ID", http.StatusBadRequest)
        return
    }

    err = utils.Delete_Event(Event_Id_Int, User_Id)
    if err != nil {
        http.Error(w, "Failed to delete event: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    fmt.Fprint(w, "Event deleted successfully")
}
