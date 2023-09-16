package database

import (
	"database/sql"
	modules "katsu.bio/modules/random"
	"log"
	"strings"

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

	_, tableCreationError = database_connection.Exec("CREATE TABLE IF NOT EXISTS blogs(blog_id SMALLINT, blog_title VARCHAR(150), blog_description VARCHAR(200), blog_tag VARCHAR(50), blog_html VARCHAR(100000));")

	if tableCreationError != nil {
		return false
	} else {
		return true
	}
}

func CreateBlog() (string, error) {
	var tableCreationError error
	blogID := modules.RandomString(16)

	tx, err := database_connection.Begin()
	if err != nil {
		return "", err
	}
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	_, tableCreationError = tx.Exec("INSERT INTO blogs(blog_id, blog_title, blog_description, blog_tag, blog_html) VALUES(?, ?, ?, ?, ?)", blogID, "Blog Title", "Blog Description", "Blog Tag", "<div></div>")

	if tableCreationError != nil {
		tx.Rollback()
		return "", tableCreationError
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}

	return blogID, nil
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

			rowScanError := rows.Scan(&currentBlog.BlogID, &currentBlog.BlogTitle, &currentBlog.BlogDescription, &currentBlog.BlogTag, &currentBlog.BlogHTML)

			if rowScanError != nil {
				log.Fatal(rowScanError)

				return ReturnBlogs
			}
			ReturnBlogs = append(ReturnBlogs, currentBlog)
		}

		return ReturnBlogs
	} else {
		rows, databaseQueryError := database_connection.Query("SELECT * FROM blogs WHERE blog_id = ? OR blog_tag = ? OR blog_title LIKE ?", query, strings.ToLower(query), "%"+query+"%")

		if databaseQueryError != nil {
			log.Fatal(databaseQueryError)

			return ReturnBlogs
		}
		defer rows.Close()

		for rows.Next() {
			var currentBlog structs.Blog

			rowScanError := rows.Scan(&currentBlog.BlogID, &currentBlog.BlogTitle, &currentBlog.BlogDescription, &currentBlog.BlogTag, &currentBlog.BlogHTML)

			if rowScanError != nil {
				log.Fatal(rowScanError)

				return ReturnBlogs
			}
			ReturnBlogs = append(ReturnBlogs, currentBlog)
		}

		return ReturnBlogs
	}
}

func UpdateBlog(blogID string, title string, description string, tag string, html string) bool {
	var returnStatement = true
	tx, _ := database_connection.Begin()

	if title != "" {
		_, databaseError := database_connection.Exec("UPDATE blogs SET blog_title = ? WHERE blog_id = ?", title, blogID)

		if databaseError != nil {
			tx.Rollback()
			returnStatement = false
		}
		defer tx.Commit()
	}
	if description != "" {
		_, databaseError := database_connection.Exec("UPDATE blogs SET blog_description = ? WHERE blog_id = ?", description, blogID)

		if databaseError != nil {
			tx.Rollback()
			returnStatement = false
		}
		defer tx.Commit()
	}
	if tag != "" {
		_, databaseError := database_connection.Exec("UPDATE blogs SET blog_tag = ? WHERE blog_id = ?", strings.ToLower(tag), blogID)

		if databaseError != nil {
			tx.Rollback()
			returnStatement = false
		}
		defer tx.Commit()
	}
	if html != "" {
		_, databaseError := database_connection.Exec("UPDATE blogs SET blog_html = ? WHERE blog_id = ?", html, blogID)

		if databaseError != nil {
			tx.Rollback()
			returnStatement = false
		}
		defer tx.Commit()
	}

	return returnStatement
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

func GetHTML(blogID string) string {
	var returnString string
	rows, databaseErrorQuery := database_connection.Query("SELECT blog_html FROM blogs WHERE blog_id = ?", blogID)

	if databaseErrorQuery == sql.ErrNoRows {
		return ""
	}
	defer rows.Close()

	for rows.Next() {
		var currentReturnString string

		rowScanError := rows.Scan(&currentReturnString)

		if rowScanError != nil {
			log.Fatal(rowScanError)
		} else {
			returnString = currentReturnString
		}
	}
	return returnString
}
