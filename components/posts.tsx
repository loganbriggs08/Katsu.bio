import { useEffect, useState } from "react";
import CustomCard from './customcard';
import { FaArrowRightLong } from 'react-icons/fa6'

interface Blog {
	blog_id: string;
	blog_title: string;
	blog_description: string;
	blog_tag: string;
}

export const Posts = () => {
    const [blogData, setBlogData] = useState<Blog[]>([]);

	useEffect(() => {
		fetch("http://localhost:6969/api/blogs")
			.then((response) => response.json())
			.then((data) => {
			setBlogData(data.blog_results);
		})
		.catch((error) => {
			console.log(error);
		});
	}, []);

	return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "0.5rem" }}>
        	<div style={{ width: "35%" }}>
				<h1 style={{ fontSize: "1.8rem", fontWeight: "500", marginRight: "1rem" }}>Recent Posts</h1>
				
				{blogData.slice(0, 2).map((blog) => (
					<div key={blog.blog_id} style={{ marginBottom: "1rem" }}>
						<CustomCard blog={blog} />
					</div>
				))}

				<a href="/posts/" style={{ color: "#fff", textDecoration: "none" }}>
					<p style={{ display: "flex", justifyContent: "flex-end", marginRight: "1rem" }}>
						All Posts <span style={{ marginLeft: "0.5rem" }}><FaArrowRightLong style={{ marginTop: "auto", marginBottom: "auto" }}/></span>
					</p>
				</a>
        	</div>
    	</div>
	);
};
