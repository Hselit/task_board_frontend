export type CardStatus = "todo" | "progress" | "done";

export interface Card {
  id: number;
  title: string;
  description?: string;
  status: CardStatus;
}