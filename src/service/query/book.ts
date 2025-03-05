import { useMutation } from "@tanstack/react-query";
import { postBook } from "../api/book";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export type bookType = {
  title: string;
  author: string;
};

export const useBookMutation = () => {
  return useMutation({
    mutationFn: (bookList: bookType[]) => postBook(bookList),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const result = error.response.data.message;
        console.error(result);
        alert(result);
      } else {
        console.error("네트워크 오류 발생", error);
        alert("책 등록에 실패했습니다. 네트워크 오류가 발생했습니다.");
      }
    },
  });
};
