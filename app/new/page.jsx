"use client";

import { useState } from "react";
import { Photo } from "../icons/Photo";
import { firestore, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "next/navigation";

export default function New() {
  // 새로운 feed를 생성
  const [url, setUrl] = useState("");
  const [value, setValue] = useState();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[400px] bg-white mb-1">
        <div id="header" className="flex items-center justify-between p-2">
          {/* profile */}
          <div className="flex items-center ">
            <div
              className={`rounded-full w-10 h-10
              bg-[url('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')]
              bg-contain mr-2`}
            />
            <div>
              <div className="font-semibold">작성자</div>
              <div className="font-light">위치</div>
            </div>
          </div>
          {/* 더보기 버튼 */}
          <div>{/* <Menu /> */}</div>
        </div>
        <div
          id="content"
          className="w-[400px] h-[400px] flex justify-center items-center"
        >
          {url ? (
            <img
              className="object-cover	w-[400px] h-[400px]"
              src={url}
              alt="img"
            />
          ) : (
            <>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={async (e) => {
                  try {
                    const file = e.target.files[0];
                    const generatedId = uuidv4();
                    await uploadBytes(ref(storage, generatedId), file);
                    const url = await getDownloadURL(ref(storage, generatedId));
                    setUrl(url);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Photo />
              </label>
            </>
          )}
        </div>

        <div id="comments" className="p-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border-2 w-full h-12 rounded-sm"
          />
        </div>
      </div>
      <button
        className="fixed bottom-10 left-0 right-0 mx-auto
       w-16 h-16
       bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/768px-Instagram-Icon.png)]
       bg-cover shadow-xl"
        onClick={async () => {
          try {
            const docRef = await addDoc(collection(firestore, "feeds"), {
              id: "xxxx",
              author: {
                id: "awnklfneawe",
                name: "frogman",
                profileImg:
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              },
              location: "seoul",
              image: url,
              text: value,
              liked: [],
            });
            console.log(docRef); // undefined
            router.push("/"); //
          } catch (error) {
            console.error(error);
          }
        }}
      ></button>
    </main>
  );
}
