"use client";

import { Card } from "../../types/card";
import TaskCard from "./Card";

type Props = {
    title: string;
    cards: Card[];

    onAdd: () => void;
    onEdit: (card: Card) => void;
    onDelete: (card: Card) => void;
};

export default function Column({
    title,
    cards,
    onAdd,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="flex h-[calc(100vh-140px)] flex-col rounded-xl border border-gray-200 bg-white shadow">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {title}
                </h2>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                    {cards.length}
                </span>
            </div>

            {/* Scrollable Cards */}

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {cards.map((card) => (
                    <TaskCard
                        key={card.id}
                        card={card}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Fixed Footer */}

            <div className="border-t p-4">
                <button
                    onClick={onAdd}
                    className="w-full rounded border border-dashed py-2 text-gray-600 hover:bg-white"
                >
                    + Add Card
                </button>
            </div>

        </div>
    );
}