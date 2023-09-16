import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [lastLoggedValue, setLastLoggedValue] = useState(null);
  const [blogHtmlContent, setBlogHtmlContent] = useState<string>("<div></div>");
  const [isBrowser, setIsBrowser] = useState(false);
  var timer: any;

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  const reloadPage = () => {
    if (isBrowser) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchBlogHtml = async () => {
      try {
        const response = await fetch("https://katsu.bio/api/blogs/html", {
          method: "GET",
          headers: {
            id: blog.blog_id,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data.blog_html !== "") {
          setBlogHtmlContent(data.blog_html);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogHtml();
  });

  const updateHTML = async (htmlCode: any) => {
    try {
      const response = await fetch('https://katsu.bio/api/blogs/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "id": blog.blog_id,
          "html": htmlCode.replace(/[\r\n]+/g, ''),
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to update HTML via API.');
      }
      
    } catch (error) {
      console.error(error);
      ErrorToast("Failed to update HTML via API.");
    }
  };

  const logValue = useCallback((value: any) => {
    setLastLoggedValue(value);
  }, []);

  const onChange = useCallback((value: any, viewUpdate: any) => {
    clearTimeout(timer); 

    timer = setTimeout(() => {
      updateHTML(value)
    }, 2000);

  }, [logValue]);

  const SuccessToast = (message: string) => {
    toast.success(message, {
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

  const ErrorToast = (message: string) => {
    toast.error(message, {
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

  const handleUpdateClick = async () => {
    if (title == "" && description == "" && tag == "") {
      ErrorToast("Please update values before pressing update.")
    } else {
      try {
        const response = await fetch('https://katsu.bio/api/blogs/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'id': blog.blog_id,
            'title': title,
            'description': description,
            'tag': tag,
          }
        });
  
        if (response.ok) {
          const data = await response.json();

          if (data.updated) {
              SuccessToast("Post has been successfully updated.")
          } else {
              ErrorToast("Failed to update post data.")
          }
        } else {
          ErrorToast("Failed to update post data.")
        }
      } catch (error) {
        ErrorToast("Failed to update post data, check the console.")
          console.error(error);
      }
    }
  }
  
  return (
    <div>
      <div className="PostEditWrapper">
        <div className="PostEditWrapper2Div">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "0.5rem", verticalAlign: "bottom" }}>{blog.blog_title}</h1>
          </div>

          <div style={{ marginLeft: "2rem" }}>
            <p style={{ fontSize: "20px", marginBottom: "0px" }}>Quick Edit:</p>
            <p style={{ marginTop: "0.1rem", opacity: "80%" }}>Press the Update button to save changes from here.</p>

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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setTag(e.target.value)}
            />

            <button
              className='UpdateButton'
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
              }}
              onClick={handleUpdateClick}
            >
              Update
            </button>
          </div>
          <div style={{ marginLeft: "2rem" }}>
            <p style={{ fontSize: "20px", marginBottom: "0px" }}>Code Edit:</p>
            <p style={{ marginTop: "0.1rem", opacity: "80%" }}>Changes here are automatically saved.</p>
              <CodeMirror
                    value={blogHtmlContent}
                    height="200px"
                    width="85%"
                    theme={"dark"}
                    extensions={[html()]}
                    onChange={onChange}
              />
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