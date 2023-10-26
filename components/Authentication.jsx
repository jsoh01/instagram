"use client";

import { useEffect } from "react";
import { useAuth } from "../store/useAuth";
import { useRouter } from "next/navigation";

export const Authentication = () => {
  const { user, signIn, signOut, subscribeAlarm } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return;
    signIn(loggedInUser);
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeAlarm(router);
    return () => unsubscribe();
  }, [user]);

  return (
    <>
      {user && (
        <button
          className="fixed top-2 left-2 "
          onClick={() => {
            signOut();
            localStorage.removeItem("user");
            router.push("/");
          }}
        >
          logout
        </button>
      )}
    </>
  );
};
