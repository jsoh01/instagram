import { create } from "zustand";
import {
  where,
  query,
  collection,
  getDocs,
  setDoc,
  doc,
} from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "../firebase";
import { useAuth } from "./useAuth";

export const useContents = create((set, get) => ({
  contents: [],
  getContent: (id) => {
    return get().contents.find((content) => content.id === id);
  },
  fetchContents: async () => {
    const snapShot = await getDocs(collection(firestore, "feeds"));
    const nextContents = [];
    snapShot.forEach((doc) => {
      const res = doc.data();
      res.comments = [];
      nextContents.push(res);
    });
    set((state) => (state.contents = nextContents));
  },
  fetchComments: async (targetContentId) => {
    const res = [];
    const commentsRef = await getDocs(
      collection(firestore, "feeds", targetContentId, "comments")
    );
    commentsRef.forEach((doc) => res.push(doc.data()));
    return res;
  },
  createContent: async ({ location, image, text }) => {
    const author = useAuth.getState().user;
    if (!author) return;
    const docId = uuidv4();
    await setDoc(doc(firestore, "feeds", docId), {
      id: docId,
      author,
      location,
      image,
      text,
      liked: [],
    });
  },
  updateContent: (nextContent) => {
    const currentContents = get().contents;
    const nextContents = currentContents.map((content) =>
      content.id === nextContent.id ? { ...content, ...nextContent } : content
    );
    set((state) => (state.contents = nextContents));
  },
  addComment: async (targetContent, comment) => {
    const author = useAuth.getState().user;
    if (!author) return;
    const id = uuidv4();
    const commentDoc = {
      id,
      text: comment,
      author,
    };
    await setDoc(
      doc(firestore, "feeds", targetContent.id, "comments", id),
      commentDoc
    );
    const nextContent = {
      ...targetContent,
      comments: [...targetContent.comments, commentDoc],
    };
    get().updateContent(nextContent);
  },
  getChatRoom: async (targetContent) => {
    const author = useAuth.getState().user;
    if (!author) return;
    if (targetContent.author.id === author.id) return;
    const id = uuidv4();
    const key = [author.id, targetContent.author.id].sort().join(",");

    // 이미 채팅바이 있는지 체크한다
    const chatRoomSnapshot = await getDocs(
      query(collection(firestore, "chats"), where("guests", "==", key))
    );
    if (chatRoomSnapshot.size === 1) {
      const chatRoomId = chatRoomSnapshot.docs[0].id;
      console.log(`chatRoomFound : ${chatRoomId}`);
      return chatRoomId;
    }

    const chatRoomDoc = {
      id,
      guests: key,
    };
    await setDoc(doc(firestore, "chats", id), chatRoomDoc);
    console.log(`create new chat room ${id}`);
    return id;
  },
}));
