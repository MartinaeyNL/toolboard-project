package endpoint

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"path/filepath"
	"toolboard/http_server/api/service"
	"toolboard/http_server/models"
)

// GetAllWidgets backend
//
//		@Summary		Get all widgets, locally and externally
//		@Description	Returns one json object with all available widgets
//		@Tags			widget
//		@Produce		json
//		@Success		200	{object}	[]models.Widget
//	    @Failure		404
//		@Failure		500
//		@Router			/widget/all [get]
func GetAllWidgets(ctx *gin.Context) {

	widgets := service.QueryAllWidgets(ctx)

	if widgets != nil {
		ctx.JSON(200, widgets)
	}
}

// GetWidget backend
//
//		@Summary		Get widget by ID
//		@Description	Returns a json object of the Widget with the smae ID
//		@Tags			widget
//	    @Param          id   path      string  true  "Widget ID"
//		@Produce		json
//		@Success		200	{object}	models.Widget
//	    @Failure		404
//		@Failure		500
//		@Router			/widget/{id} [get]
func GetWidget(ctx *gin.Context) {
	param := ctx.Param("id")

	widgets := service.QueryAllWidgets(ctx)

	if widgets != nil {
		for _, widget := range widgets {
			if widget.ID == param {
				ctx.JSON(200, widget)
				return
			}
		}
		ctx.AbortWithStatus(404)
	}

}

// EmbedWidgetHTML backend
//
//			@Summary		Get HTML of a Widget
//			@Description	Returns html of the Widget with the smae ID
//			@Tags			widget
//		    @Param          id   path      string  true  "Widget ID"
//	        @Param          file path      string  false "Optional file name"
//			@Produce		html
//			@Success		200
//		    @Failure		404
//			@Failure		415
//			@Failure		500
//			@Router			/widget/embed/{id}/{file} [get]
func EmbedWidgetHTML(ctx *gin.Context) {
	param := ctx.Param("id")
	filePath := ctx.Param("file")
	fmt.Println("[" + param + "]")
	fmt.Println("[" + filePath + "]")

	widgets := service.QueryAllWidgets(ctx)

	var widget []models.Widget
	if widgets != nil {
		for _, wgt := range widgets {
			if wgt.ID == param {
				widget = append(widget, wgt)
				break
			}
		}
	}

	if len(widget) == 0 {
		ctx.AbortWithStatus(404)
		return
	}

	var widgetJSON models.WidgetJSON
	jsonErr := json.Unmarshal([]byte(widget[0].WidgetJSON), &widgetJSON)
	if jsonErr != nil {
		fmt.Println(jsonErr.Error())
		ctx.AbortWithStatus(500)
		return
	}

	path := filepath.Join(widget[0].InstallPath, widgetJSON.Content.Location)
	if filePath != "/" {
		path = filepath.Join(filepath.Dir(path), filePath)
	}
	fmt.Println(path)

	ctx.File(path)
}
