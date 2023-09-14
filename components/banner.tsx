import {Divider} from '@nextui-org/divider'
import {Card, CardBody, CardFooter} from "@nextui-org/card";

export const Banner = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<div
				style={{
				backgroundColor: "#202020",
				borderRadius: "6px",
				width: "40%",
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
					Announcement:
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
			</div>
		</div>
	);
};
