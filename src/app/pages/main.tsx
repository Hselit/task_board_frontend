"use client";

import Navbar from "@/components/Navbar";
import Board from "@/components/Board/Board";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar
        title="Task Board"
        status="online"
        activeUsers={3}
      />

      <Board />
    </div>
  );
}