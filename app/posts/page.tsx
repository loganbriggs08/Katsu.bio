'use client'

import CustomCard from '../../components/customcard';
import React, { useState, useEffect } from 'react';
import { Divider } from "@nextui-org/divider";
import { FaArrowLeftLong } from 'react-icons/fa6'

interface Blog {
  blog_id: string;
  blog_title: string;
  blog_description: string;
  blog_tag: string;
}

const PostsPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [blogResults, setBlogResults] = useState<Blog[]>([]);
  const [blogTagsData, setBlogTagsData] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:6969/api/tags")
      .then((response) => response.json())
      .then((data) => {
        setBlogTagsData(data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <div className='PostsWrapperSearchDiv'>
        <div className='PostsWrapperSearch2Div'>
          <h1 style={{ fontSize: "40px", fontWeight: "500", marginBottom: "1rem" }}>All Posts</h1>

          <input
            className="SearchPosts"
            placeholder="Search Posts"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

      <Divider style={{ opacity: "80%" }}/>
		<div>
			{blogTagsData && blogTagsData.length > 0 ? (
				blogTagsData.map((tag, index) => (
				<button className='TagButton' onClick={() => setSearchValue(tag)} style={{ marginTop: "0.5rem", marginRight: "0.5rem", padding: "0.5rem", borderRadius: "0.2rem", backgroundColor: "#292932", border: "none", color: "#fff" }} key={index}>{tag.toUpperCase()}</button>
				))
			) : (
				<p>No tags available</p>
			)}
		</div>

          <div>
            {blogResults === null ? (
				<p style={{ fontSize: "1.3rem" }}>No Results 😔</p>
			) : blogResults.length === 0 ? (
				<p style={{ fontSize: "1.3rem" }}>Loading your results 😊</p>
			) : (
				blogResults.map((blog) => (
					<CustomCard key={blog.blog_id} blog={blog} />
				  ))
				)}
          </div>

			<a href="/" style={{ color: "#fff", textDecoration: "none" }}>
				<p style={{ display: "flex", justifyContent: "flex-end", marginRight: "1rem" }}>
					<span><FaArrowLeftLong style={{ marginTop: "auto", marginBottom: "auto", marginRight: "0.5rem" }}/>Go Back</span>
				</p>
			</a>
        </div>
      </div>
    </div>
  );
}

export default PostsPage;