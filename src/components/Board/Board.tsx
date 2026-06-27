"use client";

import { useEffect, useState } from "react";

import Column from "./Column";
import CardModal from "../Modal/CardModal";

import { Card, CardStatus } from "../../types/card";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../services/taskServices";

const statusMap = {
  todo: 1,
  progress: 2,
  done: 3,
} as const;

export default function Board() {
  const [cards, setCards] = useState<Card[]>([]);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] =
    useState<CardStatus>("todo");

  const [editingCard, setEditingCard] =
    useState<Card | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();

      setCards(tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (status: CardStatus) => {
    setEditingCard(null);
    setSelectedStatus(status);
    setOpen(true);
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);

    if (card.listId === 1) setSelectedStatus("todo");
    if (card.listId === 2) setSelectedStatus("progress");
    if (card.listId === 3) setSelectedStatus("done");

    setOpen(true);
  };

  const handleSave = async (
    title: string,
    status: CardStatus
  ) => {
    try {
      if (editingCard) {
        const updated = await updateTask(
          editingCard.id,
          title,
          statusMap[status],
          editingCard.position
        );

        setCards((prev) =>
          prev.map((card) =>
            card.id === updated.id ? updated : card
          )
        );
      } else {
        const task = await createTask(
          title,
          statusMap[status]
        );

        setCards((prev) => [...prev, task]);
      }

      setOpen(false);
      setEditingCard(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (card: Card) => {
    if (!confirm(`Delete "${card.name}"?`)) return;

    try {
      await deleteTask(card.id);

      setCards((prev) =>
        prev.filter((item) => item.id !== card.id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl flex-1 p-6">
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          <Column
            title="To Do"
            cards={cards.filter((c) => c.listId === 1)}
            onAdd={() => handleAdd("todo")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Column
            title="In Progress"
            cards={cards.filter((c) => c.listId === 2)}
            onAdd={() => handleAdd("progress")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Column
            title="Done"
            cards={cards.filter((c) => c.listId === 3)}
            onAdd={() => handleAdd("done")}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        </div>
      </div>

      <CardModal
        open={open}
        status={selectedStatus}
        card={editingCard}
        onClose={() => {
          setOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSave}
      />
    </>
  );
}