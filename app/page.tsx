'use client' 

import { Posts } from "@/components/posts";
import { Socials } from "@/components/socials";
import { Profile } from "@/components/profile";

export default function Home() {
	return (
		<div>
			<Profile/>
			<Posts/>
			<Socials/>
		</div>
	);
}
