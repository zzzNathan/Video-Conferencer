package models

import "time"

// Event struct holds event data, this is also the format of our DB
type Event struct {
    Event_ID    int       `json:"Event_Id"`
    User_ID     string    `json:"User_Id"`
    Title       string    `json:"Title"`
    Description string    `json:"Description"`
    Date        time.Time `json:"Date"`
}
