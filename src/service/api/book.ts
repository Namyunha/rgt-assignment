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
