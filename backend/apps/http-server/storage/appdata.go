package storage

import (
	"fmt"
	"log"
	"os"
)

func GetToolboardFolderPath() string {
	osDir, err := os.UserConfigDir()
	if err != nil {
		fmt.Println(err.Error())
		return ""
	} else {
		path := osDir + "\\toolboard"
		exists := doesPathExist(path)
		if exists == false {
			initAppdataFolder(path)
		}
		return path
	}
}

func initAppdataFolder(path string) {

	log.Println("Initializing Appdata folder..")

	// Create directories
	err := os.MkdirAll(path, os.ModePerm)
	if err == nil {
		var dirErrors []error
		err1 := os.Mkdir(path+"\\databases", os.ModePerm)
		err2 := os.Mkdir(path+"\\settings", os.ModePerm)
		err3 := os.Mkdir(path+"\\logs", os.ModePerm)
		err4 := os.Mkdir(path+"\\widgets", os.ModePerm)
		dirErrors = append(dirErrors, err1, err2, err3, err4)
		for _, val := range dirErrors {
			if val != nil {
				log.Fatal(val.Error())
			}
		}

	} else {
		log.Fatal(err.Error())
	}

}

func doesPathExist(path string) bool {
	_, err := os.Stat(path)
	if err == nil {
		return true
	} else if os.IsNotExist(err) {
		return false
	}
	log.Fatal(err.Error())
	return false
}
