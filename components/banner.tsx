import {Divider} from '@nextui-org/divider'
import {Card, CardBody, CardFooter} from "@nextui-org/card";

export const Banner = () => {
	return (
		<div style={{  }}>
			<Card style={{ backgroundColor: "#212121", borderRadius: "6px", width: "40%", marginLeft: "auto", marginRight: "auto", marginTop: "1.5rem" }} shadow="none">
				<CardBody style={{ padding: "0.1rem", marginLeft: "1.5rem", marginRight: "1.5rem" }}>
					<h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#FFFFFF" }}>Announcement</h1>
					<Divider style={{  }}/>
					<p style={{ fontSize: "1.5rem", color: "#FFFFFF" }}>This website can now be found on Github, </p>
					

				</CardBody>
			</Card>
		</div>
	);
};
