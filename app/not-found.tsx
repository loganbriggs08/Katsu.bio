'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);
  
  const blog_id = currentUrl.match(/\/([^/]+)\/?$/)?.[1];

  const [blogHtmlContent, setBlogHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogHtml = async () => {
      try {
        if (blog_id) {
          const response = await fetch("https://katsu.bio/api/blogs/html", {
            method: "GET",
            headers: {
              blog_id: blog_id,
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();

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
