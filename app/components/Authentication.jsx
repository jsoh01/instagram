"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";
import { useRouter } from "next/navigation";

export const Authentication = () => {
  const { user, signIn, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return;
    signIn(loggedInUser);
  }, []);

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
