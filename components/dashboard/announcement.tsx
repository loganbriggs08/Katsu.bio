import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface Announcement {
	announcement_message: string;
	updated: boolean;
}

export const Announcement = () => {
    const [newAnnouncement, setAnnouncement] = useState("");
    const [announcementData, setAnnouncementData] = useState<Announcement>();

    const cookies = document.cookie.split(";");

    const passwordCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("password=")
    );

	useEffect(() => {
		fetch("https://katsu.bio/api/announcement")
			.then((response) => response.json())
			.then((data) => {
                setAnnouncementData(data);
		})
		.catch((error) => {
			console.log(error);
		});
	}, []);

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
        try {
        const response = await fetch('https://katsu.bio/api/announcement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'announcement': newAnnouncement?? '',
                'password': passwordCookie?.split("=")[1] ?? '',
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

	return (
        <div>
            <input
              type="text"
              placeholder="Update announcement..."
              className="UpdateAnnouncementInput"
              onChange={(e) => setAnnouncement(e.target.value)}
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
                width: "100%",
                height: "3.5rem",
                borderRadius: "0.4rem",
                fontSize: "large",
              }}
              onClick={handleUpdateClick}
            >
              Update
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
