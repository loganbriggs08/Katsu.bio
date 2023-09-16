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
	BlogHTML        string `json:"blog_html"`
}

type Blogs struct {
	BlogResults []Blog `json:"blog_results"`
}

type BlogUpdate struct {
	Updated bool `json:"updated"`
}

type BlogCreated struct {
	Created bool `json:"created"`
}

type Tags struct {
	Tags []string `json:"tags"`
}

type ReturnHTML struct {
	BlogHTML string `json:"blog_html"`
}

type LoginResult struct {
	LoginSuccess bool `json:"login_success"`
}

type AnnouncementResult struct {
	AnnouncementMessage string `json:"announcement_message"`
	Updated             bool   `json:"updated"`
}
