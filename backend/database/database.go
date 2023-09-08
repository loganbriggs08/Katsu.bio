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

func createTables() bool {
	database_connection.Exec("CREATE TABLE IF NOT EXISTS ")
}
