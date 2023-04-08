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
