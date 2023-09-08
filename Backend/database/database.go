package database

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var database_connection *sql.DB

func Initialize() bool {
	connection, databaseConnectionError := sql.Open("sqlite3", "database.db")

	if databaseConnectionError != nil {
		return false
	} else {
		database_connection = connection
		return true
	}
}

func CreateTables() bool {
	var tableCreationError error

	_, tableCreationError = database_connection.Exec("CREATE TABLE IF NOT EXISTS blogs(blog_id SMALLINT, blog_title VARCHAR(255), blog_description VARCHAR(255), blog_tags TEXT[]);")

	if tableCreationError != nil {
		return false
	} else {
		return true
	}
}
