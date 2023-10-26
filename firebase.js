// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*
const firebaseConfig = {
  apiKey: "AIzaSyA0FWbsJ3DHthVb7P5iaocoKupqL2vRQNU",
  authDomain: "instagram-e828a.firebaseapp.com",
  projectId: "instagram-e828a",
  storageBucket: "instagram-e828a.appspot.com",
  messagingSenderId: "69303140091",
  appId: "1:69303140091:web:901f8db0e6c1ca0cfafa5e",
};
*/

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
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
