import { Divider } from "@nextui-org/divider";
import { BsDiscord, BsGithub } from 'react-icons/bs'

export const Profile = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%" }}>
			<div style={{ width: "35%" }}>
				<img src="https://cdn.discordapp.com/avatars/1052982721598738522/7e71686c3ef7a0614699aa704e98bd3d.png" style={{ borderRadius: "1.5rem", padding: "none" }}/>
				
				<div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
					<h1 style={{ fontSize: "40px", fontWeight: "500", marginRight: "1rem" }}>Katsu</h1>
					<h1 style={{ fontSize: "22px", fontWeight: "500" }}>[he/him]</h1>
					
					<a href="https://discord.com/channels/@me/1052982721598738522/" target="_blank" style={{ color: "#fff", marginLeft: "1rem", fontSize: "25px" }}>
						<BsDiscord/>
					</a>

					<a href="https://github.com/NotKatsu/" target="_blank" style={{ color: "#fff", marginLeft: "1rem", fontSize: "23px" }}>
						<BsGithub/>
					</a>
				</div>
				
				<img src="https://skillicons.dev/icons?i=python,go,typescript,react,mongodb,postgres,github,docker,vim" style={{ marginBottom: "1rem" }}/>
				<Divider/>
			</div>
		</div>
	);
};
