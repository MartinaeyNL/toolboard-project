package models

import "time"

// Dashboard backend
type Dashboard struct {
	ID          uint               `json:"id" gorm:"primarykey"`
	CreatedAt   time.Time          `json:"createdAt,omitempty"`
	UpdatedAt   time.Time          `json:"updatedAt,omitempty"`
	DisplayName string             `json:"displayName"`
	Description *string            `json:"description"`
	Widgets     *[]DashboardWidget `json:"widgets"`
}

// DashboardWidget backend
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
}

// DashboardWidgetLocation backend
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
}
