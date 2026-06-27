"use client";

import Navbar from "@/components/Navbar";
import Board from "@/components/Board/Board";
import { Card } from "@/types/card";

const cards: Card[] = [
    {
        id: 1,
        title: "Design database",
        status: "todo",
    },
    {
        id: 2,
        title: "Socket.IO Setup",
        status: "progress",
    },
    {
        id: 3,
        title: "Deploy Backend",
        status: "done",
    },
];

export default function Home() {
    return (
       <div className="flex min-h-screen flex-col bg-gray-100">

            <Navbar
                title="Task Board"
                status="online"
                activeUsers={3}
            />

            <Board cards={cards} />

        </div>
    );
}