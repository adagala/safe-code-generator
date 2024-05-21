"use client";
import { SignIn } from "@/components/signin";
import { Code } from "@/components/code";
import { useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <Code setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <SignIn setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}
