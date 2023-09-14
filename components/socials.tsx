import { useEffect, useState } from "react";
import CustomCard from './customcard';
import { FaArrowRightLong } from 'react-icons/fa6'

export const Socials = () => {
	return (
        <div className="SocialsWrapperDiv">
        	<div  className="SocialsWrapper2Div">
				<h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "1rem" }}>Socials</h1>
                <a href="https://discord.com/channels/@me/1052982721598738522" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='PostCard'
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
                            Discord
                            </h1>
                        </div>
                        <p
                            style={{
                            fontSize: "16px",
                            color: "rgba(255, 255, 255, 0.6)",
                            marginTop: "0px",
                            }}
                        >
                            Discord is my primary source of communication, if you need to contact me do it by Discord.
                        </p>
                        </div>
                    </div></a>

                    <a href="https://github.com/NotKatsu" target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='PostCard'
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
                            Github
                            </h1>
                        </div>
                        <p
                            style={{
                            fontSize: "16px",
                            color: "rgba(255, 255, 255, 0.6)",
                            marginTop: "0px",
                            }}
                        >
                            Github is home to the majority of my projects, my open source ones can be found here.
                        </p>
                        </div>
                    </div></a>
        	</div>
    	</div>
	);
};
