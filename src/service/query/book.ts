import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBook,
  postBook,
  deleteBook,
  updateBook,
  getBookDetail,
} from "../api/book";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export type bookType = {
  id: string;
  title: string;
  author: string;
  quantity: number;
};

export const useBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookList: bookType[]) => postBook(bookList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const result = error.response.data.message;
        console.error(result);
        alert(result);
      } else {
        console.error("네트워크 오류 발생", error);
        alert("네트워크 오류가 발생했습니다.");
      }
    },
  });
};

export const useBookQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: getBook,
  });

export const useBookInfoQuery = (id: string) =>
  useQuery({
    queryKey: ["books", { id }],
    queryFn: () => getBookDetail(id),
  });

export const useUpdateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, quantity }: { title: string; quantity: number }) =>
      updateBook({ title, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] }); // 책 목록을 다시 불러오기 위해 쿼리 무효화
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const result = error.response.data.message;
        console.error(result);
        alert(result);
      } else {
        console.error("네트워크 오류 발생", error);
        alert("네트워크 오류가 발생했습니다.");
      }
    },
  });
};

export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => deleteBook(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const result = error.response.data.message;
        console.error(result);
        alert(result);
      } else {
        console.error("네트워크 오류 발생", error);
        alert("네트워크 오류가 발생했습니다.");
      }
    },
  });
};
