'use client'

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import atomone from '@uiw/codemirror-theme-atomone'
import { Posts } from '../components/dashboard/posts'

export const Dashboard = () => {
    const onChange = React.useCallback((value: any, viewUpdate: any) => {
        console.log('value:', value);
    }, []);

	return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%" }}>
        	<div style={{ width: "35%" }}>
				<h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "1rem" }}>Dashboard</h1>
                <div style={{ marginLeft: "2rem" }}>
                    <p style={{ fontSize: "20px" }}>Edit Posts:</p>
                    <Posts/>
                </div>

                {/* <CodeMirror
                    value="<div></div>"
                    height="400px"
                    theme={"dark"}
                    extensions={[html()]}
                    onChange={onChange}
                    
                    style={{ }}
                /> */}
        	</div>
    	</div>
	);
};
