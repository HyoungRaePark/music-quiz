"use client";

import GameSidebar from "@/components/GameSidebar";

export default function BoardWritePage() {
  return (
    <>
      <GameSidebar />

      <main
        style={{
          marginLeft: "250px",
          padding: "32px 52px",
          color: "#fff",
        }}
      >
        <h1>글쓰기</h1>
      </main>
    </>
  );
}