"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Card, CardStatus } from "../../types/card";

type Props = {
  open: boolean;
  status: CardStatus;
  card: Card | null;
  onClose: () => void;
  onSave: (title: string, status: CardStatus) => Promise<void>;
};

export default function CardModal({
  open,
  status,
  card,
  onClose,
  onSave,
}: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle(card?.name ?? "");
    }
  }, [open, card]);

  if (!open) return null;

  const handleSave = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);

      await onSave(title.trim(), status);

      setTitle("");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {card ? "Edit Task" : "Add Task"}
          </h2>

          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-full p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="p-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Task Name
          </label>

          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
          />
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading || title.trim() === ""}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading
              ? card
                ? "Updating..."
                : "Saving..."
              : card
              ? "Update"
              : "Save"}
          </button>

        </div>
      </div>
    </div>
  );
}