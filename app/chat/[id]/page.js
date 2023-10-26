"use client";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  where,
  query,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  getDoc,
  onSnapshot,
} from "@firebase/firestore";
import { firestore } from "@/firebase";
import { useAuth } from "@/app/store/useAuth";
import { Bubble } from "../_components/Bubble";

export default function Chat() {
  const [roomInfo, setRoomInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!params.id) return;
    fetchChatRoom();
  }, [params.id]);

  useEffect(() => {
    if (!roomInfo) return;
    const guests = roomInfo.guests.split(",");
    const isInvited = guests.some((id) => id === user.id);
    if (!isInvited) {
      router.push("/");
      return;
    }
    const unsubscribe = subscribeMessages();
    return () => unsubscribe();
  }, [roomInfo]);

  const fetchChatRoom = async () => {
    const roomId = params.id;
    if (!roomId || Array.isArray(roomId)) return;
    const roomInfoDoc = await getDoc(doc(firestore, "chats", roomId));
    if (!roomInfoDoc.exists()) return;
    const fetchedRoomInfo = roomInfoDoc.data();
    setRoomInfo(fetchedRoomInfo);
  };

  const subscribeMessages = () => {
    if (!roomInfo) return;
    /** socket 통신 */
    const unsubscribe = onSnapshot(
      collection(firestore, "chats", roomInfo.id, "messages"),
      (snapshot) => {
        if (snapshot.empty) return;
        const messagesData = snapshot.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.createdAt - b.createdAt);
        setMessages(messagesData);
      }
    );
    return unsubscribe;
  };

  const sendMessage = async (text) => {
    if (!roomInfo) return;

    const newMessage = {
      id: uuidv4(),
      text,
      author: user,
      createdAt: Date.now(),
    };
    await addDoc(
      collection(firestore, "chats", roomInfo.id, "messages"),
      newMessage
    );
    console.log(roomInfo.guests);
    const receiver = roomInfo.guests.split(",").filter((x) => x !== user.id)[0];
    await addDoc(collection(firestore, "alarms", receiver, "notifications"), {
      id: "xxx",
      message: `${user.name} : ${text}`,
    });
  };

  return (
    <main className="flex min-h-screen flex-col justify-between pt-8">
      <div className="flex flex-col p-4">
        {messages.map((message) => (
          <Bubble
            key={message.id}
            message={message}
            isMine={user.id === message.author.id}
          />
        ))}
      </div>
      <form
        className="w-[95%] self-center h-12 rounded-full  mb-1 overflow-hidden text-white"
        onSubmit={async (e) => {
          e.preventDefault();
          const value = e.target[0].value;
          await sendMessage(value);
          e.target[0].value = "";
        }}
      >
        <input className="w-5/6 h-full bg-black outline-none px-4" />
        <button className="w-1/6 h-full bg-black">send</button>
      </form>
    </main>
  );
}
