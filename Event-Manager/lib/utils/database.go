package utils

import (
    "Event-Manager/lib/models"
    "database/sql"
    "encoding/json"
    "os"
    _ "github.com/lib/pq"
)

// Connect to our DB, and returns a connection
func Connect() (*sql.DB, error) {
    CONN_STRING := os.Getenv("DB_CONN_STRING")

    db, err := sql.Open("postgres", CONN_STRING)

    return db, err
}

// Get all of a user's events from the DB in JSON format
func Get_Events(User_Id string) (string, error) {
    db, err := Connect()
    defer db.Close() // Ensures connection closes once function returns

    // SQL Query to get events ordered by date, (most recent events first)
    query := `
        SELECT event_id, user_id, title, description, date
        FROM events
        WHERE user_id = $1
        ORDER BY date DESC
    `

    rows, err := db.Query(query, User_Id)
    defer rows.Close()

    // Iterate through results, and add each event to the slice
    // then return all of their events in a json object
    var events []models.Event
    for rows.Next() {
        var event models.Event
        err := rows.Scan(
            &event.Event_ID,
            &event.User_ID,
            &event.Title,
            &event.Description,
            &event.Date,
        )
        if err != nil {
            return "", err
        }
        events = append(events, event)
    }

    Json_Data, err := json.Marshal(events)

    return string(Json_Data), nil
}

// Count the number of events a user has
func Get_Event_Count(User_Id string) (int, error) {
    db, err := Connect()
    var count = 0
    defer db.Close()

    query := `SELECT COUNT(*) FROM events WHERE user_id = $1`
    err = db.QueryRow(query, User_Id).Scan(&count)

    return count, err
}

// Add a new event to the database
func Add_Event(Event models.Event) error {
    db, err := Connect()
    defer db.Close()

    query := `
        INSERT INTO events (user_id, title, description, date)
        VALUES ($1, $2, $3, $4)
    `

    _, err = db.Exec(query, Event.User_ID, Event.Title, Event.Description, Event.Date)
    return err
}

// Deletes a given event from the database, given a user id and the event's event id
func Delete_Event(Event_Id int, User_Id string) error {
    db, err := Connect()
    defer db.Close()

    query := `
        DELETE FROM events
        WHERE event_id = $1 AND user_id = $2
    `

    _, err = db.Exec(query, Event_Id, User_Id)
    return err
}
