import React from 'react';

interface BlogData {
  blog_id: string;
  blog_title: string;
  blog_tag: string;
  blog_description: string;
}

interface CustomCardProps {
  blog: BlogData;
}

const CustomCard: React.FC<CustomCardProps> = ({ blog }) => {
  const blogLink = `/posts/${blog.blog_id}`;
  console.log(blog.blog_id) 
  
  return (
    <a href={blogLink} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='PostCard'
        style={{
          backgroundColor: "#202020",
          borderRadius: "6px",
          width: "100%",
          marginTop: "1.2rem",
        }}
      >
        <div
          style={{
            padding: "0.1rem",
            marginLeft: "1.5rem",
            marginRight: "1.5rem",
            paddingTop: "0.4rem",
            paddingBottom: "0.4rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "500", marginRight: "1rem" }}>
              {blog.blog_title}
            </h1>
            <div
              style={{
                backgroundColor: "#292932",
                padding: "0.3rem",
                borderRadius: "0.2rem",
              }}
            >
              {blog.blog_tag.toUpperCase()}
            </div>
          </div>

          <p
            style={{
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.6)",
              marginTop: "0px",
            }}
          >
            {blog.blog_description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default CustomCard;