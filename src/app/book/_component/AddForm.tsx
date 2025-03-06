import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useBookMutation } from "@/service/query/book";

type BookFormType = {
  title: string[];
  author: string[];
  quantity: number[]; // 각 책에 대한 수량을 받습니다.
};

interface AddFormProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddForm({ quantity, setQuantity }: AddFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BookFormType>();

  const mutation = useBookMutation();

  const onSubmit: SubmitHandler<BookFormType> = (data) => {
    // 책 제목, 저자, 수량을 모두 필터링하여 리스트 작성
    const bookList = data.title
      .map((title, index) => ({
        title,
        author: data.author[index],
        quantity: data.quantity[index],
      }))
      .filter(
        (book) =>
          book.title.length > 0 && book.author.length > 0 && book.quantity > 0
      );

    // 책 등록 API 호출
    mutation.mutate(bookList);
  };

  useEffect(() => {
    if (mutation.status === "success") {
      reset();
      setQuantity(1);
      alert("책 등록이 성공적으로 완료되었습니다!");
    }
  }, [mutation.status, reset, setQuantity]);

  // 수량 변경 시, 새로운 책 항목을 동적으로 생성하도록 설정
  useEffect(() => {
    const newBook = new Array(quantity).fill("");

    newBook.forEach((_, idx) => {
      if (idx + 1 >= quantity) {
        setValue(`title.${idx}`, "");
        setValue(`author.${idx}`, "");
        setValue(`quantity.${idx}`, 1); // 기본 수량은 1로 설정
      }
    });
  }, [quantity, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white shadow-lg rounded-md"
    >
      <h2 className="text-2xl font-semibold mb-4">책 등록</h2>
      {new Array(quantity).fill(0).map((_, idx) => (
        <div className="mb-4" key={idx}>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register(`title.${idx}`, {
                required: "책 제목을 입력해주세요.",
              })}
            />
            {errors.title && errors.title[idx] && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title[idx]?.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              저자
            </label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register(`author.${idx}`, {
                required: "책 저자를 입력해주세요.",
              })}
            />
            {errors.author && errors.author[idx] && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author[idx]?.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              수량
            </label>
            <input
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min={1}
              defaultValue={1}
              {...register(`quantity.${idx}`, {
                required: "책 수량을 입력해주세요.",
                min: 1,
              })}
            />
            {errors.quantity && errors.quantity[idx] && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity[idx]?.message}
              </p>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-amber-400 text-white rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        책 등록하기
      </button>
    </form>
  );
}
