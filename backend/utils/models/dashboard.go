package models

import "time"

type Dashboard struct {
	ID        uint               `json:"id" gorm:"primarykey"`
	CreatedAt time.Time          `json:"createdAt,omitempty"`
	UpdatedAt time.Time          `json:"updatedAt,omitempty"`
	Metadata  DashboardMetadata  `json:"metadata"`
	Widgets   *[]DashboardWidget `json:"widgets"`
} //@name Dashboard

type DashboardMetadata struct {
	ID          uint            `json:"id" gorm:"primarykey"`
	CreatedAt   time.Time       `json:"createdAt,omitempty"`
	UpdatedAt   time.Time       `json:"updateAt,omitempty"`
	DashboardId uint            `json:"dashboardId"`
	DisplayName string          `json:"displayName"`
	Description *string         `json:"description"`
	HeaderImage *[]byte         `json:"headerImage"`
	Tags        *[]DashboardTag `json:"tags"`
} //@name DashboardMetadata

type DashboardTag struct {
	ID                  uint      `json:"id" gorm:"primarykey"`
	CreatedAt           time.Time `json:"createdAt,omitempty"`
	UpdatedAt           time.Time `json:"updatedAt,omitempty"`
	DisplayName         string    `json:"displayName"`
	DashboardMetadataId int       `json:"dashboardMetadataId"`
	BgColor             string    `json:"bgColor"`
	TextColor           string    `json:"textColor"`
} //@name DashboardTag

type DashboardWidget struct {
	ID          uint                    `json:"id" gorm:"primarykey"`
	CreatedAt   time.Time               `json:"createdAt,omitempty"`
	UpdatedAt   time.Time               `json:"updatedAt,omitempty"`
	DashboardId int                     `json:"dashboardId"`
	DisplayName string                  `json:"displayName"`
	Description *string                 `json:"description"`
	Widget      Widget                  `json:"widget"`
	Location    DashboardWidgetLocation `json:"location"`
	WidgetId    int                     `json:"widgetId"`
	LocationId  int                     `json:"locationId"`
} //@name DashboardWidget

type DashboardWidgetLocation struct {
	ID        uint      `json:"id" gorm:"primarykey"`
	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
	X         int       `json:"x"`
	Y         int       `json:"y"`
	Width     int       `json:"width"`
	MinWidth  *int      `json:"minWidth"`
	MaxWidth  *int      `json:"MaxWidth"`
	Height    int       `json:"height"`
	MinHeight *int      `json:"minHeight"`
	MaxHeight *int      `json:"maxHeight"`
} //@name DashboardWidgetLocation
