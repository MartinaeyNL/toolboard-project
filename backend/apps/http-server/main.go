// @title           Toolboard API
// @version         1.0
// @description     Documentation for the exposed HTTP API.

// @host      localhost:8080
// @BasePath  /api/v1

package http_server

import (
	"fmt"
	"toolboard/http_server/api"
	"toolboard/http_server/database"
)

func Run() {

	fmt.Println("Initializing the database..")
	database.Init()

	fmt.Println("Starting the Backend API..")
	api.Run()
}
