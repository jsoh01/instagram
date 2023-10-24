"use client";

import { Feed } from "./components/Feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "@/firebase";

export default function Home() {
  const [contents, setContents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    const snapShot = await getDocs(collection(firestore, "feeds"));
    const nextContents = [];
    snapShot.forEach((doc) => nextContents.push(doc.data()));
    setContents(nextContents);
  };

  return (
    <>
      <h1> MAIN</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {contents.map((content) => (
          <Feed key={content.id} content={content} />
        ))}
      </main>
      <button
        className="fixed bottom-10 left-0 right-0 mx-auto
       w-16 h-16
       bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/768px-Instagram-Icon.png)]
       bg-cover shadow-xl"
        onClick={() => router.push("/new")}
      ></button>
    </>
  );
}
