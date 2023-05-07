package models

import "time"

// Dashboard model info
type Dashboard struct {
	ID          uint               `json:"id" gorm:"primarykey"`
	CreatedAt   time.Time          `json:"createdAt,omitempty"`
	UpdatedAt   time.Time          `json:"updatedAt,omitempty"`
	DisplayName string             `json:"displayName"`
	Description *string            `json:"description"`
	Widgets     *[]DashboardWidget `json:"widgets"`
} //@name Dashboard

// DashboardWidget model info
// @description Widget inside a Dashboard
type DashboardWidget struct {
	ID          uint                    `json:"id" gorm:"primarykey"`
	CreatedAt   time.Time               `json:"createdAt,omitempty"`
	UpdatedAt   time.Time               `json:"updatedAt,omitempty"`
	DashboardId uint                    `json:"dashboardId"`
	DisplayName string                  `json:"displayName"`
	Description *string                 `json:"description"`
	Widget      Widget                  `json:"widget"`
	Location    DashboardWidgetLocation `json:"location"`
	WidgetId    uint
	LocationId  uint
} //@name DashboardWidget

// DashboardWidgetLocation model info
// @description Location of a widget inside a Dashboard
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
