"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInPage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.username} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      No signed in user <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
