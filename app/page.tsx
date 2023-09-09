'use client' 

import { Posts } from "@/components/posts";
import { Profile } from "@/components/profile";

export default function Home() {
	return (
		<div>
			<Profile/>
			<Posts/>
		</div>
	);
}
