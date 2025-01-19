package handler

import (
  "fmt"
  "os"
  "net/http"
  "time"
  "strings"
  "encoding/json"
  "github.com/golang-jwt/jwt/v4"
  "github.com/google/uuid"
)

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

// Generate a 100ms management token with JWT, refer to
// https://www.100ms.live/docs/get-started/v2/get-started/security-and-tokens#management-token-for-rest-api
func Get_Management_Token() string {
	Secret_Key  := os.Getenv("MS_SECRET")
	Access_Key  := os.Getenv("MS_ACCESS")
	Signing_Key := []byte(Secret_Key)

	expiresIn        := uint32(24 * 3600)
	currentTimeStamp := uint32(time.Now().UTC().Unix())
	expiryTimeStamp  := currentTimeStamp + expiresIn

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"access_key": Access_Key,
		"type":       "management",
		"version":    2,
		"jti":        uuid.New().String(),
		"iat":        currentTimeStamp,
		"exp":        expiryTimeStamp,
		"nbf":        currentTimeStamp,
	})

	signedToken, _ := token.SignedString(Signing_Key)

	return signedToken
}

// Return a new 100ms room code
func Get_Room_Code() (string, string, error) {
	Room_Id := os.Getenv("ROOM_ID")
	Token   := Get_Management_Token()

	// Make request
	URL := "https://api.100ms.live/v2/room-codes/room/" + Room_Id
	req, err := http.NewRequest("POST", URL, strings.NewReader(""))
	if err != nil {
		return "", "", err
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer " + Token)

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", "", err
	}
	defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return "", "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
    }

    // Parse JSON response
	var response RoomCodeResponse
    if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
        return "", "", fmt.Errorf("error decoding response: %v", err)
    }

    // Extract codes
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

// Entry point
func Handler(w http.ResponseWriter, r *http.Request) {
	// Settings CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Only allow GET requests
	if r.Method != http.MethodGet {
        w.Header().Set("Allow", "GET")
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }

	Host_Code, Guest_Code, err := Get_Room_Code()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Return the codes as JSON
    response := map[string]string{
        "Host_Code": Host_Code,
        "Guest_Code": Guest_Code,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}
