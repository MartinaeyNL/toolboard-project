package api

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"toolboard/http_server/api/endpoint"
)

func Run() {

	fmt.Println("Starting up the REST API!")

	// Create a new Gin router
	router := gin.New()

	// Apply middleware such as CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:34115", "http://localhost:9009"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Content-Length", "accept", "origin"},
	}))

	// Register the routes with linked methods
	getRoutes(router)

	// Run the router
	runErr := router.Run()
	if runErr != nil {
		return
	}
}

func getRoutes(router *gin.Engine) []*gin.RouterGroup {

	apiRoutes := router.Group("/api/v1")
	{
		dashboardRoutes := apiRoutes.Group("/dashboard")
		{
			dashboardRoutes.GET("/all", endpoint.GetAllDashboards)
			dashboardRoutes.POST("", endpoint.PostDashboard)
			dashboardRoutes.PUT("", endpoint.PutDashboard)
			dashboardRoutes.DELETE("/:id", endpoint.DeleteDashboard)
		}
		userRoutes := apiRoutes.Group("/user")
		{
			userRoutes.GET("", nil)
		}
		widgetRoutes := apiRoutes.Group("/widget")
		{
			widgetRoutes.GET("/all", endpoint.GetAllWidgets)
			widgetRoutes.GET("/:id", endpoint.GetWidget)
			widgetRoutes.GET("/embed/:id/*file", endpoint.EmbedWidgetHTML)
		}
	}

	swaggerRoutes := router.Group("/swagger")
	{
		swaggerRoutes.GET("/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	var routerGroup []*gin.RouterGroup
	return append(routerGroup, apiRoutes, swaggerRoutes)
}
