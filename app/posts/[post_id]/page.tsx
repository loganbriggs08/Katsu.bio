'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { post_id: string } }) {
  const router = useRouter();
  const post_id = params.post_id;
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      } finally {
        setIsLoading(false);
      }
    }

    fetchHtmlContent();
  }, [post_id]);

  return (
    <div>
      {isLoading ? null : htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <h1>Page/Post couldn't be found</h1>
      )}
    </div>
  );
}
