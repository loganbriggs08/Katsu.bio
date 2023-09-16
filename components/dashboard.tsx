'use client'

import React from 'react';
import { Posts } from '../components/dashboard/posts'
import { CreatePost } from '../components/dashboard/createpost'
import { Announcement } from '../components/dashboard/announcement'

export const Dashboard = () => {
	return (
        <div className='DashboardLoggedInDivWrapper'>
        	<div className='DashboardLoggedIn2DivWrapper'>
				<h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "1rem" }}>Dashboard</h1>

                <div style={{ marginLeft: "2rem" }}>
                    <p style={{ fontSize: "20px" }}>Edit Posts:</p>
                    <Posts/>
                    <CreatePost/>
                </div>

                <div style={{ marginLeft: "2rem" }}>
                    <p style={{ fontSize: "20px", marginTop: "3rem" }}>Edit Announcement:</p>
                    <Announcement/>
                </div>
        	</div>
    	</div>
	);
};
