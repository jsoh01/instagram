"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {
  setDoc,
  doc,
  collection,
  where,
  getDocs,
  query,
} from "@firebase/firestore";
import { auth, firestore } from "../../firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/useAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Auth() {
  const [isLoginMode, setLoginMode] = useState(true);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleGoogleLoginButtonClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    const newUser = {
      id: user.uid,
      name: user.email.split("@")[0],
      profileImg: user.photoURL,
    };
    signIn(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <button onClick={handleGoogleLoginButtonClick}>구글 로그인</button>
      <div>
        <label>name : </label>
        <input value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        <label>PW : </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
      {!isLoginMode && (
        <div>
          <label>PW confirm : </label>
          <input
            type="password"
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={async () => {
          if (isLoginMode) {
            const storedUser = await getDocs(
              query(collection(firestore, "users"), where("name", "==", id))
            );
            const targetUsers = [];
            storedUser.forEach((doc) => targetUsers.push(doc.data()));
            if (targetUsers.length === 0) {
              window.alert("해당 계정으로 가입된 정보가 없습니다");
              return;
            }
            if (targetUsers.length > 1) {
              console.error("데이터가 꼬인것 같아요");
              return;
            }
            const targetUser = targetUsers[0];
            if (targetUser.pw !== pw) {
              window.alert("비밀번호가 다릅니다.");
              return;
            }

            window.alert("로그인에 성공했습니다.");
            signIn(targetUser);
            localStorage.setItem("user", JSON.stringify(targetUser));
            router.push("/");
            return;
          }

          // 회원가입 모드

          // validation
          if (pw !== pwConfirm) {
            window.alert("두개의 비밀번호가 다릅니다");
            return;
          }

          const storedUser = await getDocs(
            query(collection(firestore, "users"), where("name", "==", id))
          );
          const targetUsers = [];
          storedUser.forEach((doc) => targetUsers.push(doc.data()));
          if (targetUsers.length > 0) {
            window.alert(
              "중복된 계정 정보 이름이 있습니다. 이름을 변경해주세요."
            );
            return;
          }
          const docId = uuidv4();
          const newUser = {
            id: docId,
            name: id,
            pw,
          };
          await setDoc(doc(firestore, "users", docId), newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
          signIn(useUser);
          window.alert("회원가입에 완료했습니다");
          router.push("/");
        }}
      >
        {isLoginMode ? "로그인" : "회원가입"}
      </button>
      <button onClick={() => setLoginMode(!isLoginMode)}>
        {isLoginMode ? "회원가입 하러가기" : "로그인 하러가기"}
      </button>
    </main>
  );
}
