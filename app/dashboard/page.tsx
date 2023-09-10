'use client'

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';

const DashboardPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const loggedInCookie = cookies.find(cookie => cookie.trim().startsWith('loggedIn='));

    if (loggedInCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/dashboard/login");
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%" }}>
        <div style={{ width: "35%" }}>
          {isLoggedIn ? (
            <h1>Dashboard</h1>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;


