import React from 'react';
import { IoMdSettings } from 'react-icons/io'
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BlogData {
  blog_id: string;
  blog_title: string;
  blog_tag: string;
  blog_description: string;
}

interface CustomCardProps {
  blog: BlogData;
}

const Edit: React.FC<CustomCardProps> = ({ blog }) => {
  const UpdatedPost = () => {
    toast.success('Post has been Updated.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%" }}>
        <div style={{ width: "35%" }}>
				  <h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "1rem" }}>{blog.blog_title}</h1>
            <div style={{ marginLeft: "2rem" }}>
                <p style={{ fontSize: "20px" }}>Quick Edit:</p>
                <input
                  type="text"
                  placeholder="Change the Title..."
                  style={{
                  backgroundColor: "#202020",
                  paddingLeft: "0.8rem",
                  marginBottom: "1rem",
                  border: "none",
                  color: "#fff",
                  width: "80%",
                  height: "3.5rem",
                  borderRadius: "0.4rem",
                  fontSize: "large"
                  }}
                />

                <input
                  type="text"
                  placeholder="Change the Description..."
                  style={{
                  backgroundColor: "#202020",
                  paddingLeft: "0.8rem",
                  marginBottom: "1rem",
                  border: "none",
                  color: "#fff",
                  width: "80%",
                  height: "3.5rem",
                  borderRadius: "0.4rem",
                  fontSize: "large"
                  }}
                />

                <input
                  type="text"
                  placeholder="Change the Tag..."
                  style={{
                  backgroundColor: "#202020",
                  paddingLeft: "0.8rem",
                  marginBottom: "1rem",
                  border: "none",
                  color: "#fff",
                  width: "80%",
                  height: "3.5rem",
                  borderRadius: "0.4rem",
                  fontSize: "large"
                  }}
                />

                <button className='LoginButton'
                  style={{
                      backgroundColor: "#4251F5",
                      paddingLeft: "0.8rem",
                      marginBottom: "3rem",
                      marginTop: "0.1rem",
                      border: "none",
                      color: "#fff",
                      width: "83%",
                      height: "3.5rem",
                      borderRadius: "0.4rem",
                      fontSize: "large",
                  }} onClick={UpdatedPost}>Update</button>
            </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ backgroundColor: "#202020" }}
      />
    </div>
  );
}

export default Edit;