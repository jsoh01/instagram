"use client";
import { v4 as uuidv4 } from "uuid";

import { Feed } from "./components/Feed";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, setDoc, doc } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./store/useAuth";

export default function Home() {
  const [contents, setContents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchFeeds();
  }, []);

  const onUpdateContents = (nextContent) => {
    const nextContents = contents.map((content) =>
      content.id === nextContent.id ? { ...content, ...nextContent } : content
    );
    setContents(nextContents);
  };

  const onAddComment = async (targetContent, comment) => {
    const id = uuidv4();
    const commentDoc = {
      id,
      text: comment,
      author: user,
    };
    await setDoc(
      doc(firestore, "feeds", targetContent.id, "comments", id),
      commentDoc
    );
    const nextContent = {
      ...targetContent,
      comments: [...targetContent.comments, commentDoc],
    };
    onUpdateContents(nextContent);
  };

  const fetchFeeds = async () => {
    const snapShot = await getDocs(collection(firestore, "feeds"));
    const nextContents = [];
    snapShot.forEach(async (doc) => {
      const res = doc.data();
      // res.comments = [];
      // const commentsRef = await getDocs(
      //   collection(firestore, "feeds", doc.id, "comments")
      // );
      // commentsRef.forEach((doc) => res.comments.push(doc.data()));
      console.log({ res });
      nextContents.push(res);
    });
    setContents(nextContents);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {contents.map((content, index) => (
          <Feed
            key={index}
            content={content}
            loggedInUser={user}
            onUpdateContents={onUpdateContents}
            onAddComment={onAddComment}
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
