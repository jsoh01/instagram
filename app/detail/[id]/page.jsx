"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useContents } from "../../../store/useContents";
import { useParams } from "next/navigation";
import { Feed } from "../../../components/Feed";
import { useAuth } from "../../../store/useAuth";
import { addDoc, collection } from "@firebase/firestore";
import { firestore } from "@/firebase";

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
          const notificationId = uuidv4();
          await addDoc(
            collection(firestore, "alarms", content.author.id, "notifications"),
            {
              id: notificationId,
              message: `[new comment]\n${user.name} : ${comment}`,
              redirectURL: `/detail/${content.id}`,
              read: false,
            }
          );
        }}
        comments={comments}
        commentInputVisible
        getChatRoom={getChatRoom}
      />
    </main>
  );
}

/**
 * 1. 2:15~2:50 전체 코드를 살펴봐주세요 (+10 쉬는시간)
 * 2. 3:00 퀴즈풀이 좀 갖고 + 제가 코드 전체를 보면서 다시한번 설명
 *  - react hook 이 친구들의 각각 역할?ex)useState, useEffect
 *    react에서 관리되는 데이터를 처리하기 위한 도구들
 *    useState : state(변경되는 값)을 관리하는 hook
 *    useEffect : 어떤 값을 observing해서 특정 로직을 수행하거나,
 *    라이프사이클 관련 된 로직을 수행하는 hook
 *
 *  - next.js 의 routing+dynamic routing, 이것을 하려면 폴더 구조 및 파일을 어떻게 처리해야 하나요?
 *
 *  - state management(상태관리)는 무엇이며, 왜 써야하나요?
 *  - zustand - 어떤 패턴을 기반으로 한 상태관리 라이브러리인가요?
 *    FLUX 1-way 1곳에서만 데이터를 관리하고, VIEW 는 데이터를 내려받기
 *    angular -> 2-way binding 상태 관리
 *    MVC (Model) - (VIEW) - (CONTROLLER)
 *  - '재활용'이라는 관점에서 componenent를 설명해주세요
 *  - state와 props의 차이점을 설명해주세요
 *
 *
 * 3. ~:설명 ) 질문 받는 시간을 갖겠습니다
 */
