package database

import (
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
	"toolboard/http_server/models"
	"toolboard/http_server/storage"
)

var db *gorm.DB

func Init() {

	dbDriverName := "sqlite3"

	dbPath := storage.GetToolboardFolderPath()
	if len(dbPath) == 0 {
		return
	}
	dbPath += "\\databases\\dashboard.db"
	fmt.Println("Using [" + dbPath + "] as SQLite database")

	dialector := getDialector(dbDriverName, dbPath)

	db = openDatabase(dialector)

	migrate()
}

func openDatabase(dialector gorm.Dialector) *gorm.DB {

	db, err := gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		log.Fatal(err.Error())
	}
	return db
}

func getDialector(driverName string, path string) gorm.Dialector {

	switch driverName {
	case "sqlite3":
		return sqlite.Open(path)
	/*case "mysql":
		return mysql.Open(path)
	case "postgresql":
		return postgres.Open(path)*/
	default:
		return nil
	}
}

func migrate() {

	err := db.AutoMigrate(&models.Dashboard{})
	if err != nil {
		log.Fatal(err.Error())
	}
}
