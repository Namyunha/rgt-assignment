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

export const getBookDetail = async (id: string) => {
  console.log("post id = ", id);
  const response = await instance.post(`/bookInfo`, { id });
  console.log("response = ", response);
  return response.data;
};

export const updateBook = async ({
  title,
  quantity,
}: {
  title: string;
  quantity: number;
}): Promise<{ message: string }> => {
  const response = await instance.patch("/book", { title, quantity });
  return response.data;
};

export const deleteBook = async (
  title: string
): Promise<{ message: string }> => {
  console.log("title = ", title);
  const response = await instance.delete(`/book`, {
    data: { title },
  });
  return response.data;
};
