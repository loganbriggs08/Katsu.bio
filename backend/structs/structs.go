package structs

type Error struct {
	ErrorCode    int64  `json:"error_code"`
	ErrorMessage string `json:"error_message"`
}

type Blog struct {
	BlogID          string `json:"blog_id"`
	BlogTitle       string `json:"blog_title"`
	BlogDescription string `json:"blog_description"`
	BlogTag         string `json:"blog_tag"`
}

type Blogs struct {
	BlogResults []Blog `json:"blog_results"`
}

type Tags struct {
	Tags []string `json:"tags"`
}
