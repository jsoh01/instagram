// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBLPq27Zf0tJ4M73KMAgGN2A7Rdlj5KojQ",
  authDomain: "instagram-f03c5.firebaseapp.com",
  projectId: "instagram-f03c5",
  storageBucket: "instagram-f03c5.appspot.com",
  messagingSenderId: "35327510641",
  appId: "1:35327510641:web:5c09510a1a88c79db6f3d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/** 대부분의 값을 저장하는 DB */
export const firestore = getFirestore(app);
/** 이미지만을 저장하기 위한 저장소 */
export const storage = getStorage(app);
/** 로그인을 관리하기 위한 도구 */
export const auth = getAuth(app);

// CRUD
// create, read, update, delete
//
