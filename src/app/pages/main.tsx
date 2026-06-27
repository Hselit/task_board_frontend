"use client";

import Navbar from "@/components/Navbar";
import Board from "@/components/Board/Board";

import useSocket from "@/hooks/useSocket";

export default function Home() {
  const {
    connected,
    activeUsers,
  } = useSocket();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">

      <Navbar
        title="Task Board"
        status={connected ? "online" : "offline"}
        activeUsers={activeUsers}
      />

      <Board />

    </div>
  );
}