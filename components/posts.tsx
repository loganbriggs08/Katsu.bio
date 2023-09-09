import {Chip} from "@nextui-org/chip";
import { useEffect, useState } from "react";
import {Card, CardBody} from "@nextui-org/card";

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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1.5rem" }}>
        <div style={{ width: "35%" }}>
            
            {blogData.map((blog) => (
                <div key={blog.blog_id} style={{ marginBottom: "1rem" }}>
                    <Card style={{ backgroundColor: "#212121", borderRadius: "6px", width: "100%", marginTop: "1.2rem" }} shadow="none">
                        <CardBody style={{ padding: "0.1rem", marginLeft: "1.5rem", marginRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <h1 style={{ fontSize: "20px", fontWeight: "500", marginRight: "1rem" }}>{blog.blog_title}</h1>
                                <Chip style={{ backgroundColor: "#ED4245", padding: "0.3rem", borderRadius: "0.2rem" }}>{blog.blog_tag.toUpperCase()}</Chip>
                            </div>

                            <p style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.6)", marginTop: "0px" }}>{blog.blog_description} </p>
                        </CardBody>
                    </Card>
                </div>
            ))}
        </div>
    </div>
	);
};
