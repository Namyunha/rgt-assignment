import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBook, postBook, deleteBook } from "../api/book";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export type bookType = {
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
        alert("책 등록에 실패했습니다. 네트워크 오류가 발생했습니다.");
      }
    },
  });
};

export const useBookQuery = () =>
  useQuery({
    queryKey: ["books"],
    queryFn: getBook,
  });

// 삭제 뮤테이션 추가
export const useDeleteBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      // 책 삭제 후, 책 목록을 다시 불러오기 위해 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const result = error.response.data.message;
        console.error(result);
        alert(result);
      } else {
        console.error("네트워크 오류 발생", error);
        alert("책 삭제에 실패했습니다. 네트워크 오류가 발생했습니다.");
      }
    },
  });
};
