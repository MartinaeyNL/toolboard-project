package service

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"path/filepath"
	"toolboard/http_server/models"
	"toolboard/http_server/storage"
)

func QueryAllWidgets(ctx *gin.Context) []models.Widget {
	var widgets []models.Widget

	// Get list of Widget folders
	paths, folderErr := storage.GetWidgetFolders()
	if folderErr != nil {
		fmt.Println(folderErr)
		ctx.AbortWithStatus(500)
		return nil
	}

	// Look for widget.json files
	filePaths, err := storage.FindFiles(paths, []string{"widget.json"})
	if err != nil {
		fmt.Println(err.Error())
		ctx.AbortWithStatus(500)
		return nil
	}
	if filePaths == nil || len(filePaths) == 0 {
		ctx.AbortWithStatus(404)
		return nil
	}

	// From JSON file to JSON struct
	for _, filePath := range filePaths {
		widget := models.Widget{}
		widgetJSON := models.WidgetJSON{}
		fileBytes, _ := os.ReadFile(filePath)
		jsonErr := json.Unmarshal(fileBytes, &widgetJSON)
		if jsonErr != nil {
			fmt.Println(jsonErr.Error())
			ctx.AbortWithStatus(500)
			return nil
		}
		val, strErr := json.Marshal(widgetJSON)
		if strErr != nil {
			fmt.Println(err.Error())
			ctx.AbortWithStatus(500)
			return nil
		}

		widget.ID = widgetJSON.ID
		widget.WidgetJSON = string(val)
		widget.InstallPath = filepath.Dir(filePath)

		widgets = append(widgets, widget)
	}

	if widgets == nil || len(widgets) == 0 {
		ctx.AbortWithStatus(404)
		return nil
	}

	return widgets
}
