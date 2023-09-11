import React from 'react';
import { IoMdSettings } from 'react-icons/io'
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  
  return (
    <div
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
          <button className='PostsEditButton' onClick={() => { router.push(`/posts/edit/${blog.blog_id}`);}} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#fff", fontSize: "25px" }}><IoMdSettings/></button>
        </div>
      </div>
    </div>
  );
}

export default CustomCard;