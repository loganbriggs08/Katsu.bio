'use client' 

import { useEffect, useState } from "react";

interface Blog {
  blog_id: string;
  blog_title: string;
  blog_description: string;
}

export const Blogs = () => {
  const [blogData, setBlogData] = useState<Blog[]>([]);

  useEffect(() => {
    fetch("http://localhost:6969/api/blogs")
        .then((response) => response.json())
        .then((data) => {
        setBlogData(data.blog_results);
      })
      .catch((error) => {
        console.log("Error fetching blog data:", error);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "35%" }}>
            {blogData.map((blog) => (
                <div key={blog.blog_id} style={{ marginBottom: "1rem" }}>
                    <button>
                        <h2>{blog.blog_title}</h2>
                        <p>{blog.blog_description}</p>
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};