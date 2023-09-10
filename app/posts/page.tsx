'use client'

import CustomCard from '../../components/customcard';
import React, { useState, useEffect } from 'react';
import { Divider } from "@nextui-org/divider";

interface Blog {
  blog_id: string;
  blog_title: string;
  blog_description: string;
  blog_tag: string;
}

const AboutPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [blogResults, setBlogResults] = useState<Blog[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const fetchBlogResults = async () => {
      try {
        const headers = new Headers();
        headers.append('query', searchValue);

        const response = await fetch('http://localhost:6969/api/blogs', {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('There was a problem with the Network response.');
        }

        const data = await response.json();
        setBlogResults(data.blog_results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
        fetchBlogResults();
    }, 500);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchValue]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%" }}>
        <div style={{ width: "35%" }}>
          <h1 style={{ fontSize: "40px", fontWeight: "500", marginBottom: "1rem" }}>All Posts</h1>

          <input
            className="SearchPosts"
            placeholder="Search Posts"
            style={{
              backgroundColor: "#292932",
              paddingLeft: "0.8rem",
              marginBottom: "1rem",
              border: "none",
              color: "#fff",
              width: "60%",
              height: "3rem",
              borderRadius: "0.2rem",
              fontSize: "large"
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <Divider />

          <div>
            {blogResults === null ? (
				<p style={{ fontSize: "1.3rem" }}>No Results 😔</p>
			) : blogResults.length === 0 ? (
				<p style={{ fontSize: "1.3rem" }}>Loading your results.. 😊</p>
			) : (
				blogResults.map((blog) => (
					<CustomCard key={blog.blog_id} blog={blog} />
				  ))
				)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;