package database

import (
	"database/sql"
	"log"

	"katsu.bio/structs"

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

	_, tableCreationError = database_connection.Exec("CREATE TABLE IF NOT EXISTS blogs(blog_id SMALLINT, blog_title VARCHAR(150), blog_description VARCHAR(200), blog_tag VARCHAR(50));")

	if tableCreationError != nil {
		return false
	} else {
		return true
	}
}

func GetBlogs(query string) []structs.Blog {
	var ReturnBlogs []structs.Blog

	if query == "" {
		rows, databaseQueryError := database_connection.Query("SELECT * FROM blogs")

		if databaseQueryError != nil {
			log.Fatal(databaseQueryError)

			return ReturnBlogs
		}
		defer rows.Close()

		for rows.Next() {
			var currentBlog structs.Blog

			rowScanError := rows.Scan(&currentBlog.BlogID, &currentBlog.BlogTitle, &currentBlog.BlogDescription, &currentBlog.BlogTag)

			if rowScanError != nil {
				log.Fatal(rowScanError)

				return ReturnBlogs
			}
			ReturnBlogs = append(ReturnBlogs, currentBlog)
		}

		return ReturnBlogs
	} else {
		rows, databaseQueryError := database_connection.Query("SELECT * FROM blogs WHERE blog_id = ? OR blog_title LIKE ?", query, "%"+query+"%")

		if databaseQueryError != nil {
			log.Fatal(databaseQueryError)

			return ReturnBlogs
		}
		defer rows.Close()

		for rows.Next() {
			var currentBlog structs.Blog

			rowScanError := rows.Scan(&currentBlog.BlogID, &currentBlog.BlogTitle, &currentBlog.BlogDescription, &currentBlog.BlogTag)

			if rowScanError != nil {
				log.Fatal(rowScanError)

				return ReturnBlogs
			}
			ReturnBlogs = append(ReturnBlogs, currentBlog)
		}

		return ReturnBlogs
	}
}

func GetAllTags() []string {
	var ReturnTags []string

	rows, databaseErrorQuery := database_connection.Query("SELECT blog_tag FROM blogs")

	if databaseErrorQuery != nil {
		log.Fatal(databaseErrorQuery)
	}
	defer rows.Close()

	for rows.Next() {
		var currentTag string
		var foundTag bool

		rowScanError := rows.Scan(&currentTag)

		if rowScanError != nil {
			log.Fatal(rowScanError)
		}

		for _, str := range ReturnTags {
			if str == currentTag {
				foundTag = true
			}
		}

		if foundTag != true {
			ReturnTags = append(ReturnTags, currentTag)
		}
	}

	return ReturnTags
}
