package utils

import (
    "Event-Manager/internal/models"
    "database/sql"
    "encoding/json"
    "os"
    _ "github.com/lib/pq"
)

// Connect to DB
func Connect() (*sql.DB, error) {
    CONN_STRING := os.Getenv("DB_CONN_STRING")

    // Make connection and handle errors
    db, err := sql.Open("postgres", CONN_STRING)
    if err != nil {
        return nil, err
    }

    return db, nil
}

// Get all of a user's events
func Get_Events(User_Id string) (string, error) {
    db, err := Connect()
    if err != nil {
        return "", err
    }
    defer db.Close() // Ensures connection closes once function returns

    // Query to get events ordered by date
    query := `
        SELECT event_id, user_id, title, description, date
        FROM events
        WHERE user_id = $1
        ORDER BY date DESC
    `

    // Execute query
    rows, err := db.Query(query, User_Id)
    if err != nil {
        return "", err
    }
    defer rows.Close()

    // Slice to hold all events
    var events []models.Event

    // Iterate through results
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

    // Check for errors from iterating over rows
    if err = rows.Err(); err != nil {
        return "", err
    }

    // Convert to JSON
    Json_Data, err := json.Marshal(events)
    if err != nil {
        return "", err
    }

    return string(Json_Data), nil
}

// Get count of events for a user
func Get_Event_Count(User_Id string) (int, error) {
    db, err := Connect()
    if err != nil {
        return 0, err
    }
    defer db.Close()

    var count int
    query := `SELECT COUNT(*) FROM events WHERE user_id = $1`
    err = db.QueryRow(query, User_Id).Scan(&count)
    if err != nil {
        return 0, err
    }

    return count, nil
}

// Add a new event to the database
func Add_Event(Event models.Event) error {
    db, err := Connect()
    if err != nil {
        return err
    }
    defer db.Close()

    query := `
        INSERT INTO events (user_id, title, description, date)
        VALUES ($1, $2, $3, $4)
    `

    _, err = db.Exec(query, Event.User_ID, Event.Title, Event.Description, Event.Date)
    return err
}

// Delete an event from the database
func Delete_Event(Event_Id int, User_Id string) error {
    db, err := Connect()
    if err != nil {
        return err
    }
    defer db.Close()

    query := `
        DELETE FROM events
        WHERE event_id = $1 AND user_id = $2
    `

    _, err = db.Exec(query, Event_Id, User_Id)
    return err
}
