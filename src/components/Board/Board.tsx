"use client";

import { useEffect, useState } from "react";

import Column from "./Column";
import CardModal from "../Modal/CardModal";
import { socket } from "../../libs/socket";

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

    const created = (task: Card) => {
        console.log("Socket Create Received", task);
      setCards((prev) => {
        if (prev.some((c) => c.id === task.id)) {
          return prev;
        }

        return [...prev, task].sort(
          (a, b) => a.position - b.position
        );
      });
    };

    const updated = (task: Card) => {
        console.log("Socket Update Received", task);
      setCards((prev) =>
        prev
          .map((c) => (c.id === task.id ? task : c))
          .sort((a, b) => a.position - b.position)
      );
    };

const deleted = (task: Card) => {
  console.log("Socket Delete Received", task);

  setCards((prev) =>
    prev.filter((c) => c.id !== task.id)
  );
};

    socket.on("task:created", created);
    socket.on("task:updated", updated);
    socket.on("task:deleted", deleted);

    return () => {
      socket.off("task:created", created);
      socket.off("task:updated", updated);
      socket.off("task:deleted", deleted);
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();

      setCards(
        tasks.sort((a, b) => a.position - b.position)
      );
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

    switch (card.listId) {
      case 1:
        setSelectedStatus("todo");
        break;
      case 2:
        setSelectedStatus("progress");
        break;
      case 3:
        setSelectedStatus("done");
        break;
    }

    setOpen(true);
  };

  const handleSave = async (
    title: string,
    status: CardStatus
  ) => {
    try {
      if (editingCard) {
        await updateTask(
          editingCard.id,
          title,
          statusMap[status],
          editingCard.position
        );
      } else {
        await createTask(
          title,
          statusMap[status]
        );
      }

      setOpen(false);
      setEditingCard(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async (card: Card) => {

    try {
      await deleteTask(card.id);
    } catch (err) {
      console.error(err);
      alert("Unable to delete task.");
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