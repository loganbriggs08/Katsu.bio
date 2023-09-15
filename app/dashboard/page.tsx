'use client'

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dashboard } from '../../components/dashboard'

const DashboardPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const usernameCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("username=")
    );
    const passwordCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("password=")
    );

    if (usernameCookie && passwordCookie) {
      fetch("https://katsu.bio/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "username": usernameCookie.split("=")[1],
          "password": passwordCookie.split("=")[1],
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.login_success) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            router.replace("/dashboard/login");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setIsLoggedIn(false);
          router.replace("/dashboard/login");
        });
    } else {
      setIsLoggedIn(false);
      router.replace("/dashboard/login");
    }
  }, [router]);

  return (
    <div>
      {isLoggedIn === true ? <Dashboard/> : null}
    </div>
  );
};

export default DashboardPage;
