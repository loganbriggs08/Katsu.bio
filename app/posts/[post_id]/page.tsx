'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { post_id: string } }) {
  const router = useRouter();
  const post_id = params.post_id;
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHtmlContent() {
      try {
        const response = await fetch(`https://katsu.bio/api/blogs/html`, {
          method: 'GET',
          headers: {
            'id': post_id,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const blogHtml = data.blog_html;

          setHtmlContent(blogHtml);
        } else {
          setHtmlContent(null);
        }
      } catch (error) {
        console.error("Error fetching HTML content:", error);
      }
    }

    fetchHtmlContent();
  }, [post_id]);

  return (
    <div>
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <div style={{ marginLeft: "1rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "500"}}>We couldn't find that post 😔...</h1>
            <p style={{ fontSize: "1rem" }}>We are preforming some magic to bring this post to you so please wait.</p>
        </div>
      )}
    </div>
  );
}
