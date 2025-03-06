import axios from "axios";
import { bookType } from "../query/book";

export const instance = axios.create({
  baseURL: "/api",
  headers: { "X-Custom-Header": "foobar" },
});

export const postBook = async (
  bookList: bookType[]
): Promise<{ message: string }> => {
  const response = await instance.post("/book", { bookList });
  return response.data;
};

export const getBook = async (): Promise<{ bookList: bookType[] }> => {
  const response = await instance.get("/book");
  return { bookList: response.data };
};

export const deleteBook = async (
  bookId: string
): Promise<{ message: string }> => {
  const response = await instance.delete(`/book`, {
    data: { bookId },
  });
  return response.data;
};
