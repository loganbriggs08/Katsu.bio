'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');  

    function setCookie(name: string, value: string, daysToExpire: number) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:6969/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'dashboard_password': password,
              'dashboard_username': username
            }
          });
    
          if (response.ok) {
            const data = await response.json();

            if (data.login_success) {
                setCookie("username", username, 1)
                setCookie("password", password, 1)
                router.push('/dashboard');
            } else {
                console.error('Failed to login to dashboard');
            }
          } else {
                console.error('Failed to login to dashboard');
          }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
                <div style={{ width: "35%" }}>
                    <div style={{ backgroundColor: "rgb(32, 32, 32)", width: "70%", margin: "auto", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <input
                            type="text"
                            placeholder="Username"
                            style={{
                            backgroundColor: "#191919",
                            paddingLeft: "0.8rem",
                            marginBottom: "1rem",
                            marginTop: "3rem",
                            border: "none",
                            color: "#fff",
                            width: "80%",
                            height: "3.5rem",
                            borderRadius: "0.4rem",
                            fontSize: "large"
                            }}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            style={{
                            backgroundColor: "#191919",
                            paddingLeft: "0.8rem",
                            marginBottom: "1rem",
                            marginTop: "0.1rem",
                            border: "none",
                            color: "#fff",
                            width: "80%",
                            height: "3.5rem",
                            borderRadius: "0.4rem",
                            fontSize: "large"
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        }} onClick={handleLogin}>Log in</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;