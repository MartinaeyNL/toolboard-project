package database

func GetAllEntities(values interface{}) (interface{}, error) {
	result := db.Find(&values)
	return values, result.Error
}
func CreateEntity(value interface{}) (interface{}, error) {
	result := db.Create(value)
	return value, result.Error
}
func DeleteEntityById(value interface{}, id string) error {
	result := db.Delete(&value, id)
	return result.Error
}
