"use client";

import { Feed } from "./components/Feed";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./store/useAuth";
import { useContents } from "./store/useContents";

export default function Home() {
  const { contents, fetchContents, updateContent, addComment, getChatRoom } =
    useContents();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchContents();
  }, []);

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href="/auth"> 로그인을 해주세요</Link>
      </main>
    );
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {contents.map((content, index) => (
          <Feed
            key={index}
            content={content}
            loggedInUser={user}
            onUpdateContents={updateContent}
            onAddComment={addComment}
            getChatRoom={getChatRoom}
          />
        ))}
      </main>
      <button
        className="fixed bottom-10 left-0 right-0 mx-auto
       w-16 h-16
       bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/768px-Instagram-Icon.png)]
       bg-cover shadow-xl"
        onClick={() => {
          if (user) return router.push("/new");
          router.push("/auth");
        }}
      ></button>
    </>
  );
}
