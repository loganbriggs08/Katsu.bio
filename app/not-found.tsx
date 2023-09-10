'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();
  const currentUrl = window.location.href;
  
  // Use regex to get the part of the URL after the last /
  const blog_id = currentUrl.match(/\/([^/]+)\/?$/)?.[1];

  const [blogHtmlContent, setBlogHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogHtml = async () => {
      try {
        if (blog_id) {
          // Make a request to the API with the blog_id as a header
          const response = await fetch("http://localhost:6969/api/blogs/html", {
            method: "GET",
            headers: {
              blog_id: blog_id,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

          // Check if blog_html is not empty
          if (data.blog_html !== "") {
            setBlogHtmlContent(data.blog_html);
          } else {
            router.replace("/");
          }
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.replace("/");
      }
    };

    fetchBlogHtml();
  }, [blog_id, router]);

  return (
    <div>
      {blogHtmlContent && (
        <div dangerouslySetInnerHTML={{ __html: blogHtmlContent }} />
      )}
    </div>
  );
}
