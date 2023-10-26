"use client";

import { useEffect, useState } from "react";
import { useContents } from "../../store/useContents";
import { useParams } from "next/navigation";
import { Feed } from "../../components/Feed";
import { useAuth } from "../../store/useAuth";

export default function Detail() {
  const params = useParams();
  const {
    contents,
    fetchContents,
    getContent,
    fetchComments,
    updateContent,
    addComment,
    getChatRoom,
  } = useContents();
  const [comments, setComments] = useState([]);
  const targetContent = getContent(params.id);
  const { user } = useAuth();

  useEffect(() => {
    if (contents.length > 0) return;
    fetchContents();
  }, [contents]);

  useEffect(() => {
    if (!params?.id) return;
    fetchComments(params.id).then((res) => setComments(res));
  }, [params.id]);

  if (!targetContent) return null;
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Feed
        loggedInUser={user}
        content={targetContent}
        onUpdateContents={updateContent}
        onAddComment={async (content, comment) => {
          await addComment(content, comment);
          fetchComments(params.id).then((res) => setComments(res));
        }}
        comments={comments}
        commentInputVisible
        getChatRoom={getChatRoom}
      />
    </main>
  );
}
