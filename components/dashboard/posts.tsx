import { useEffect, useState } from "react";
import CustomCard from './customcard';

interface Blog {
	blog_id: string;
	blog_title: string;
	blog_description: string;
	blog_tag: string;
}

export const Posts = () => {
    const [blogData, setBlogData] = useState<Blog[]>([]);

	useEffect(() => {
		fetch("https://katsu.bio/api/blogs")
			.then((response) => response.json())
			.then((data) => {
			setBlogData(data.blog_results);
		})
		.catch((error) => {
			console.log(error);
		});
	}, []);

	return (
        <div>
            {blogData.map((blog) => (
                <div key={blog.blog_id} style={{ marginBottom: "1rem" }}>
                    <CustomCard blog={blog} />
                </div>
            ))}
        </div>
	);
};
