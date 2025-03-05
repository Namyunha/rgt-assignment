import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useBookMutation } from "@/service/query/book";

type bookFormType = {
  title: string[];
  author: string[];
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
  } = useForm<bookFormType>();

  const mutation = useBookMutation();

  const onSubmit: SubmitHandler<bookFormType> = (data) => {
    // 책 제목과 저자를 모두 필터링
    const bookList = data.title
      .map((title, index) => ({
        title,
        author: data.author[index],
      }))
      .filter((book) => book.title.length > 0 && book.author.length > 0);
    mutation.mutate(bookList);
  };

  useEffect(() => {
    if (mutation.status === "success") {
      reset();
      setQuantity(1);
      alert("책 등록이 성공적으로 완료되었습니다!");
    }
  }, [mutation.status, reset, setQuantity]);

  useEffect(() => {
    const newBook = new Array(quantity).fill("");

    newBook.forEach((_, idx) => {
      if (idx + 1 >= quantity) {
        setValue(`title.${idx + 1}`, "");
        setValue(`author.${idx + 1}`, "");
      }
    });
  }, [quantity, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {new Array(quantity).fill(0).map((_, idx) => (
        <div className="mb-2" key={idx}>
          제목 :
          <input
            className="border-black border-2"
            type="text"
            {...register(`title.${idx}`, { required: true })}
          />
          <br />
          저자 :
          <input
            className="border-black border-2"
            type="text"
            {...register(`author.${idx}`, { required: true })}
          />
          {((errors.author && errors.author[idx]) ||
            (errors.title && errors.title[idx])) && (
            <p className="text-red-500">책의 제목 또는 저자를 입력해주세요.</p>
          )}
        </div>
      ))}
      <button className="bg-amber-200 cursor-pointer w-sm">책등록하기</button>
    </form>
  );
}
