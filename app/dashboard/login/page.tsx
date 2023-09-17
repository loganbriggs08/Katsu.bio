'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Divider } from '@nextui-org/divider'

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
          const response = await fetch('https://katsu.bio/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'password': password,
              'username': username,
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
            <div className='LoginPageWrapperDiv'>
                <div className='LoginPageWrapper2Div'>
                    <div className='LoginBackgroundWrapperDiv'>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginBottom: "1rem", marginTop: "3rem" }}>Dashboard Login</h1>

                        <input
                            type="text"
                            placeholder="Username"
                            style={{
                            backgroundColor: "#191919",
                            paddingLeft: "0.8rem",
                            marginBottom: "1rem",
                            marginTop: "1rem",
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