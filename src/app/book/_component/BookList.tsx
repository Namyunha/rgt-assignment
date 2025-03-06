"use client";

import React, { useState } from "react";
import { useBookQuery, useDeleteBookMutation } from "@/service/query/book"; // 삭제 mutation 추가
import { useUpdateBookMutation } from "@/service/query/book";

export default function BookList() {
  // 상태 관리
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]); // id를 title로 변경
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const [bookQuantities, setBookQuantities] = useState<{
    [key: string]: number;
  }>({});

  console.log("bookQuantities = ", bookQuantities);

  // 불러오기
  const { data, isLoading, error } = useBookQuery();
  // 업데이트 하기
  const updateBookMutation = useUpdateBookMutation();
  // 삭제 하기
  const deleteBookMutation = useDeleteBookMutation();

  // 페이지네이션 처리
  const itemsPerPage = 10;
  const totalPages = data?.bookList
    ? Math.ceil(data?.bookList.length / itemsPerPage)
    : 0;

  // 현재 페이지 책 목록
  const currentBooks = data?.bookList
    ? data?.bookList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  // 검색 필터링
  const filteredBooks = currentBooks.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // 책 선택 처리
  const selectBook = (bookTitle: string) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookTitle)
        ? prevSelectedBooks.filter((title) => title !== bookTitle)
        : [...prevSelectedBooks, bookTitle]
    );
  };

  // 책 단일 수량 변경
  const handleQuantityChange = (bookTitle: string, quantity: number) => {
    console.log("quantity = ", quantity);
    if (quantity < 1) {
      alert("1이상만 입력 가능합니다.");
      return;
    }
    setBookQuantities((prevQuantities) => ({
      ...prevQuantities,
      [bookTitle]: quantity,
    }));
  };
  // 책 수정 처리
  const handleUpdateQuantities = () => {
    selectedBooks.forEach((bookTitle) => {
      const quantity = bookQuantities[bookTitle] || 1;
      console.log("업데이트 ", { title: bookTitle, quantity });
      updateBookMutation.mutate({ title: bookTitle, quantity });
    });
    setSelectedBooks([]);
  };

  // 책 삭제 처리
  const handleDelete = () => {
    selectedBooks.forEach((bookTitle) => {
      deleteBookMutation.mutate(bookTitle);
    });
    setSelectedBooks([]);
  };

  // 페이지네이션 버튼 처리
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return <div className="w-full flex justify-center">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 font-sans flex justify-center my-10">
      <div className="w-full justify-center">
        {/* 검색 입력 */}
        <div className="mb-4 max-w-4/5 mx-auto">
          <input
            type="text"
            placeholder="검색 (제목 / 저자)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full max-w-xs border border-gray-300 rounded"
          />
        </div>

        <table className="w-full max-w-4/5 mx-auto table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">
                <input
                  type="checkbox"
                  checked={selectedBooks.length === filteredBooks.length}
                  onChange={() =>
                    setSelectedBooks(
                      selectedBooks.length === filteredBooks.length
                        ? []
                        : filteredBooks.map((book) => book.title)
                    )
                  }
                  className="mr-2"
                />
              </th>
              <th className="px-4 py-2 text-left">제목</th>
              <th className="px-4 py-2 text-left">저자</th>
              <th className="px-4 py-2 text-left">수량</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book.title)}
                    onChange={() => selectBook(book.title)}
                    className="mr-2"
                  />
                </td>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">
                  {selectedBooks.includes(book.title) ? (
                    <input
                      type="number"
                      value={bookQuantities[book.title] || book.quantity}
                      onChange={(e) =>
                        handleQuantityChange(book.title, +e.target.value)
                      }
                      className="p-2 w-16 border border-gray-300 rounded flex justify-center"
                    />
                  ) : (
                    book.quantity
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 테이블 밖으로 수량 업데이트 버튼 추가 */}
        {selectedBooks.length > 0 && (
          <div className="flex justify-center mt-4 gap-5">
            <div className="flex justify-center mt-4">
              <button
                onClick={handleUpdateQuantities} // 선택된 책들의 수량 업데이트
                className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                수량 변경
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleDelete} // 선택된 책들을 한번에 삭제
                className="px-6 py-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                책 삭제
              </button>
            </div>
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 disabled:bg-gray-200"
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 disabled:bg-gray-200"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
