"use client";
import React from "react";
import { useSession } from "next-auth/react";

function page() {
  const session = useSession();
  return (
    <div>
      <h1 className="text-red-700 text-4xl">
        {JSON.stringify(session.data?.user)}
      </h1>
    </div>
  );
}

export default page;
