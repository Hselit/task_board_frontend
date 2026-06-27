export type CardStatus = "todo" | "progress" | "done";

export interface Card {
  id: number;
  name: string;
  listId: number;
  position: number;
}