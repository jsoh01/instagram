import Image from "next/image";
import { Feed } from "./components/Feed";

// 새로운 이미지를 올리는 화면
// feeds 다른사람들의 피드를 보는 화면
// my 내 정보화면

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Feed />
    </main>
  );
}
