'use client' 

import { useEffect, useState } from "react";
import { Profile } from "@/components/profile";
import {Card, CardBody} from "@nextui-org/card";

interface Blog {
	blog_id: string;
	blog_title: string;
	blog_description: string;
	blog_tag: string;
}
  
export default function Home() {
	const [blogData, setBlogData] = useState<Blog[]>([]);

	useEffect(() => {
		fetch("http://localhost:6969/api/blogs")
			.then((response) => response.json())
			.then((data) => {
			setBlogData(data.blog_results);
		})
		.catch((error) => {
			console.log("Error fetching blog data:", error);
		});
	}, []);

	return (
		<div>
			<Profile/>

			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1.5rem" }}>
				<div style={{ width: "35%" }}>
					
					{blogData.map((blog) => (
						<div key={blog.blog_id} style={{ marginBottom: "1rem" }}>
							<Card style={{ backgroundColor: "#212121", borderRadius: "6px", width: "100%", marginTop: "1rem" }} shadow="none">
								<CardBody style={{ padding: "0.1rem", marginLeft: "1.5rem", marginRight: "1.5rem", paddingTop: "1rem", paddingBottom: "1rem" }}>
									<h1 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#FFFFFF" }}>{blog.blog_title} #{blog.blog_tag.toUpperCase()}</h1>
									<p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.6)" }}>{blog.blog_description} </p>
								</CardBody>
							</Card>
						</div>
					))}
				</div>
    		</div>
		</div>
	);
}
