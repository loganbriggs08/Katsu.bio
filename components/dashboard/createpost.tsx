import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";

export const CreatePost = () => {
    const router = useRouter();
    const cookies = document.cookie.split(";");

    const passwordCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("password=")
    );


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

    const createNewPost = async () => {
        try {
            const response = await fetch('https://katsu.bio/api/blogs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'password': passwordCookie?.split("=")[1] ?? '',
                },
            });
    
            if (response.ok) {
                const data = await response.json();
    
                if (data.created) {
                    const newLocation = "/posts/edit/" + data.blog_id
                    router.push(newLocation)
                } else {
                    ErrorToast("Failed to create post.");
                }
            } else {
                ErrorToast("Failed to create post.");
            }
        } catch (error) {
            ErrorToast("Failed to create post, check the console.");
            console.error(error);
        }
    }

	return (
        <div>
            <button
              className='UpdateButton'
              style={{
                backgroundColor: "#4251F5",
                marginBottom: "1rem",
                marginTop: "0.1rem",
                border: "none",
                color: "#fff",
                width: "100%",
                height: "3.5rem",
                borderRadius: "0.4rem",
                fontSize: "large",
              }}
              onClick={createNewPost}
            >
              Create a Post
            </button>

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
};
