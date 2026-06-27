"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/types/card";

type Props = {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (card: Card) => void;
};

export default function TaskCard({
  card,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-800">
          {card.name}
        </h3>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(card)}
            className="rounded-md p-2 text-blue-600 transition hover:bg-blue-100"
            title="Edit Card"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(card)}
            className="rounded-md p-2 text-red-600 transition hover:bg-red-100"
            title="Delete Card"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}