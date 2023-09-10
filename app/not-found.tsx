'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const currentUrl = window.location.href;
  const isPostsPage = currentUrl.includes("/posts/");

  const [userHtmlContent, setUserHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    if (isPostsPage) {
      const userInput = "<h1>Hello dsd</h1>";

      setUserHtmlContent(userInput);
    } else {
      router.replace("/");
    }
  }, [isPostsPage, router]);

  return (
    <div>
      {userHtmlContent && (
        <div dangerouslySetInnerHTML={{ __html: userHtmlContent }} />
      )}
    </div>
  );
}

