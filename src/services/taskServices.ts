import axios from "axios";
import { Card } from "../types/card";

const API_URL = "http://localhost:3000";

export const getTasks = async (): Promise<Card[]> => {
  const response = await axios.get(`${API_URL}/task`);
  return response.data.data;
};

export const createTask = async (
  name: string,
  listId: number
): Promise<Card> => {
  const response = await axios.post(`${API_URL}/task`, {
    name,
    listId,
  });

  return response.data.data;
};

export const updateTask = async (
  id: number,
  name: string,
  listId: number,
  position: number
): Promise<Card> => {
  const response = await axios.put(`${API_URL}/task/${id}`, {
    name,
    listId,
    position,
  });

  return response.data.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/task/${id}`);
};