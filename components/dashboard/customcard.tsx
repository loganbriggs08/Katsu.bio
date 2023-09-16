import React, { useEffect } from 'react';
import axios from 'axios';
import { IoMdSettings } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useRouter } from "next/navigation";

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

  const handleDelete = async () => {
    try {
      const password = document.cookie.replace(/(?:(?:^|.*;\s*)password\s*=\s*([^;]*).*$)|^.*$/, "$1");
      const blog_id = blog.blog_id;

      const response = await axios.delete('https://katsu.bio/api/blogs/delete', {
        headers: {
          'password': password,
          'id': blog_id,
        },
      });

      if (response.data.deleted) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

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
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <button
              className='PostsEditButton'
              onClick={() => { router.push(`/posts/edit/${blog.blog_id}`);}}
              style={{ background: "transparent", border: "none", color: "#fff", fontSize: "25px", marginLeft: "5px" }}
            >
              <IoMdSettings/>
            </button>
            <button
              className='PostsEditButton'
              onClick={handleDelete}
              style={{ background: "transparent", border: "none", color: "#ED4245", fontSize: "25px", marginLeft: "5px" }}
            >
              <MdDelete/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
