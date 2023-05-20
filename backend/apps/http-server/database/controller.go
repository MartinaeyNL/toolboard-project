package database

import (
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func GetAllEntities(values interface{}) (interface{}, error) {
	result := db.Debug().Preload(clause.Associations).Find(values)
	return values, result.Error
}
func CreateEntity(value interface{}) (interface{}, error) {
	result := db.Debug().Create(value)
	return value, result.Error
}

// UpdateEntity and its associations
// Many thanks to https://github.com/go-gorm/gorm/issues/3487 for saving me hours of figuring out.
func UpdateEntity(value interface{}) (interface{}, error) {
	result := db.Session(&gorm.Session{FullSaveAssociations: true}).Debug().Save(value)
	return value, result.Error
}
func DeleteEntityById(value interface{}, id string) error {
	result := db.Delete(value, id)
	return result.Error
}
func QueryRaw(sql string, values interface{}) (interface{}, error) {
	result := db.Debug().Raw(sql).Scan(values)
	return values, result.Error
}
