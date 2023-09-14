'use client'

import React from 'react';
import { Posts } from '../components/dashboard/posts'
import { Announcement } from '../components/dashboard/announcement'

export const Dashboard = () => {
    const onChange = React.useCallback((value: any, viewUpdate: any) => {
        console.log('value:', value);
    }, []);

	return (
        <div className='DashboardLoggedInDivWrapper'>
        	<div className='DashboardLoggedIn2DivWrapper'>
				<h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "1rem" }}>Dashboard</h1>

                <div style={{ marginLeft: "2rem" }}>
                    <p style={{ fontSize: "20px" }}>Edit Posts:</p>
                    <Posts/>
                </div>

                <div style={{ marginLeft: "2rem" }}>
                    <p style={{ fontSize: "20px", marginTop: "3rem" }}>Edit Announcement:</p>
                    <Announcement/>
                </div>
        	</div>
    	</div>
	);
};
