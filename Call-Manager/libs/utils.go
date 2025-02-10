package utils

import (
    "os"
    "fmt"
    "time"
    "bytes"
    "strings"
    "net/http"
    "encoding/json"
    "github.com/google/uuid"
    "github.com/golang-jwt/jwt/v4"
)

var Secret_Key  = os.Getenv("MS_SECRET")
var Access_Key  = os.Getenv("MS_ACCESS")
var Template_Id = os.Getenv("MS_TEMPLATE_ID")

// The format of the JSON data that is returned from the
// 100ms get room code API
type RoomCode struct {
    Code      string    `json:"code"`
    RoomID    string    `json:"room_id"`
    Role      string    `json:"role"`
    Enabled   bool      `json:"enabled"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}

type RoomCodeResponse struct {
    Data []RoomCode `json:"data"`
}

// JSON format of the incoming POST requests
type RequestBody struct {
    Room_Id string `json:"Room_Id"`
}

// The response from the 100ms room creation api call
type RoomResponse struct {
    Id string `json:"id"`
}

// Generate a 100ms management token with JWT, refer to
// https://www.100ms.live/docs/get-started/v2/get-started/security-and-tokens#management-token-for-rest-api
func Get_Management_Token() string {
    Signing_Key := []byte(Secret_Key)

    Expires_In         := uint32(24 * 3600)
    Current_Time_Stamp := uint32(time.Now().UTC().Unix())
    Expiry_Time_Stamp  := Current_Time_Stamp + Expires_In

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "access_key": Access_Key,
        "type":       "management",
        "version":    2,
        "jti":        uuid.New().String(),
        "iat":        Current_Time_Stamp,
        "exp":        Expiry_Time_Stamp,
        "nbf":        Current_Time_Stamp,
    })

    signedToken, _ := token.SignedString(Signing_Key)

    return signedToken
}

// Room creation
// --------------

// Creates a new 100ms room and returns it's room id, used for the Get_Room_Code() function
func Create_Room() (string, error) {
    Token  := Get_Management_Token()
    URL    := "https://api.100ms.live/v2/rooms"
    client := &http.Client{}

    // Create the POST request in order to create a room
    body := map[string]string{
        "template_id": Template_Id,
    }
    body_JSON, _ := json.Marshal(body)

    req, err := http.NewRequest("POST", URL, bytes.NewBuffer(body_JSON))
    if err != nil {
        return "", err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer " + Token)

    // Send request to 100ms API endpoint
    resp, err := client.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return "", fmt.Errorf("Unexpected status code: %d", resp.StatusCode)
    }

    // Parse the response and return the room id
    var Room_Response RoomResponse
    err = json.NewDecoder(resp.Body).Decode(&Room_Response)
    if err != nil {
        return "", fmt.Errorf("Error decoding response: %v", err)
    }

    return Room_Response.Id, nil
}

// Functions to get a room's host and guest codes
// -----------------------------------------------

// Return a the host and guest codes given a room id in JSON format.
func Get_Room_Code(Room_Id string) (string, string, error) {
    Management_Token := Get_Management_Token()
    URL    := "https://api.100ms.live/v2/room-codes/room/" + Room_Id
    client := &http.Client{}

    // Make request to the 100ms API and send it
    req, err := http.NewRequest("POST", URL, strings.NewReader(""))
    if err != nil {
        return "", "", err
    }

    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer " + Management_Token)

    resp, err := client.Do(req)
    if err != nil {
        return "", "", err
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return "", "", fmt.Errorf("Unexpected status code: %d", resp.StatusCode)
    }

    // Reads in response and then returns codes
    var response RoomCodeResponse
    err = json.NewDecoder(resp.Body).Decode(&response)
    if err != nil {
        return "", "", fmt.Errorf("Error decoding response: %v", err)
    }

    var Host_Code, Guest_Code string
    for _, code := range response.Data {
        if code.Role == "host" {
            Host_Code = code.Code

        } else if code.Role == "guest" {
            Guest_Code = code.Code

        }
    }

    return Host_Code, Guest_Code, nil
}

// Gives the room code for guests and hosts, in JSON format ready to be sent via HTTP
func Get_Room_Code_HTTP(w *http.ResponseWriter, id string) {
    Host_Code, Guest_Code, err := Get_Room_Code(id)

    // Return the codes in JSON format
    response := map[string]string{
        "Host_Code": Host_Code,
        "Guest_Code": Guest_Code,
    }

    (*w).Header().Set("Content-Type", "application/json")
    json.NewEncoder(*w).Encode(response)
}
