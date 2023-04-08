package models

// Widget backend
type Widget struct {
	ID          string `json:"id,omitempty" gorm:"primarykey"`
	InstallPath string `json:"installPath"`
	WidgetJSON  string `json:"widgetJSON"`
}

/*---------------------*/

type WidgetJSON struct {
	ID       string         `json:"id"`
	Manifest WidgetManifest `json:"manifest"`
	Content  WidgetContent  `json:"content"`
}

type WidgetManifest struct {
	DisplayName string `json:"displayName"`
}

type WidgetContent struct {
	Location   string `json:"location"`
	JsFileName string `json:"jsFileName"`
	HTML       string `json:"html"`
}
