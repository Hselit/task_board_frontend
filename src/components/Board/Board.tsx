"use client";

import Column from "./Column";
import { Card } from "../../types/card";

type Props = {
    cards: Card[];
};

export default function Board({
    cards,
}: Props) {
    return (
    <div className="mx-auto w-full max-w-7xl flex-1 p-6">
    <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <Column
                title="To Do"
                cards={cards.filter(c => c.status === "todo")}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
            />

            <Column
                title="In Progress"
                cards={cards.filter(c => c.status === "progress")}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
            />

            <Column
                title="Done"
                cards={cards.filter(c => c.status === "done")}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
            />

        </div>
        </div>
    );
}