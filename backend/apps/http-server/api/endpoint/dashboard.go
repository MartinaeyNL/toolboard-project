package endpoint

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"toolboard/http_server/database"
	"toolboard/models"
)

// GetAllDashboards backend
//
//	@Summary		Get all dashboards
//	@Description	Returns one json object with all dashboards in the database
//	@Tags			dashboard
//	@Produce		json
//	@Success		200	{object}	[]Dashboard
//	@Failure		500
//	@Router			/dashboard/all [get]
func GetAllDashboards(ctx *gin.Context) {
	entities, dbErr := database.GetAllEntities(&[]models.Dashboard{})
	// entities, dbErr := database.QueryRaw("SELECT * FROM dashboards", []models.Dashboard{})
	if dbErr != nil {
		fmt.Println(dbErr.Error())
		ctx.AbortWithStatus(500)
		return
	}
	ctx.JSON(200, entities)
}

// PostDashboard backend
//
//	@Summary		Create a new Dashboard
//	@Description	Stores the body dashboard object as a new entry in the database
//	@ID				post-dashboard
//	@Tags			dashboard
//	@Accept			json
//	@Produce		json
//	@Param			dashboard body		Dashboard	true		"The dashboard to create"
//	@Success		201	{object}		Dashboard
//	@Failure		400
//	@Failure		500
//	@Router			/dashboard [post]
func PostDashboard(ctx *gin.Context) {

	var dashboard models.Dashboard
	bindErr := ctx.BindJSON(&dashboard)
	if bindErr != nil {
		ctx.AbortWithStatus(400)
		return
	}

	entity, dbErr := database.CreateEntity(&dashboard)
	if dbErr != nil {
		fmt.Println(dbErr.Error())
		ctx.AbortWithStatus(500)
		return
	}

	ctx.JSON(201, entity)
}

// PutDashboard backend
//
//	@Summary		Update an existing Dashboard
//	@Description	Stores the dashboard object into the database with the same ID.
//	@ID				put-dashboard
//	@Tags			dashboard
//	@Accept			json
//	@Produce		json
//	@Param			dashboard body		Dashboard	true		"The dashboard to update"
//	@Success		200	{object}		Dashboard
//	@Failure		400
//	@Failure		500
//	@Router			/dashboard [put]
func PutDashboard(ctx *gin.Context) {

	var dashboard models.Dashboard
	bindErr := ctx.BindJSON(&dashboard)
	if bindErr != nil {
		ctx.AbortWithStatus(400)
		return
	}
	fmt.Printf("%+v\n", dashboard.Metadata)

	entity, dbErr := database.UpdateEntity(&dashboard)
	if dbErr != nil {
		fmt.Println("Error found!")
		fmt.Println(dbErr.Error())
		ctx.AbortWithStatus(500)
		return
	}

	ctx.JSON(201, entity)
}

// DeleteDashboard backend
//
//	@Summary		Delete a dashboard
//	@Description	Checks the ID in the database, and deletes that entry if present
//	@ID				delete-dashboard
//	@Tags			dashboard
//	@Param          id   path      int  true  "Dashboard ID"
//	@Success		204
//	@Failure		500
//	@Router			/dashboard/{id} [delete]
func DeleteDashboard(ctx *gin.Context) {

	param := ctx.Param("id")
	dbErr := database.DeleteEntityById(&models.Dashboard{}, param)
	if dbErr != nil {
		fmt.Println(dbErr.Error())
		ctx.AbortWithStatus(500)
		return
	}

	ctx.JSON(204, nil)
}
