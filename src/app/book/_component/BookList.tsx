"use client";

import React, { useState } from "react";
import { useBookQuery, useDeleteBookMutation } from "@/service/query/book"; // 삭제 mutation 추가

export default function BookList() {
  // 상태 관리
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]); // id를 title로 변경
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [quantityToAdd, setQuantityToAdd] = useState<number>(1); // 추가할 책 수

  // 데이터 가져오기 (useBookQuery는 이미 데이터를 가져오는 hook입니다)
  const { data, isLoading, error } = useBookQuery();
  // 삭제 뮤테이션
  const deleteBookMutation = useDeleteBookMutation();

  // 페이지네이션 처리
  const itemsPerPage = 3; // 한 페이지당 3개
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
  const toggleSelectBook = (bookTitle: string) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookTitle)
        ? prevSelectedBooks.filter((title) => title !== bookTitle)
        : [...prevSelectedBooks, bookTitle]
    );
  };

  // 전체 선택 처리
  const toggleSelectAll = () => {
    if (selectedBooks.length === filteredBooks.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(filteredBooks.map((book) => book.title)); // title을 사용
    }
  };

  // 책 삭제 처리
  const handleDelete = async () => {
    try {
      for (const title of selectedBooks) {
        await deleteBookMutation.mutate(title); // 삭제 함수 호출
      }
      setSelectedBooks([]); // 삭제 후 선택된 책 초기화
    } catch (err) {
      console.error("삭제 실패:", err);
    }
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
                  onChange={toggleSelectAll}
                  className="mr-2"
                />
              </th>
              <th className="px-4 py-2 text-left">제목</th>
              <th className="px-4 py-2 text-left">저자</th>
              <th className="px-4 py-2 text-left">수량</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.title} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book.title)}
                    onChange={() => toggleSelectBook(book.title)}
                    className="mr-2"
                  />
                </td>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 삭제 버튼 (선택된 책 삭제) */}
        {selectedBooks.length > 0 && (
          <div className="flex items-center gap-5 max-w-4/5 mx-auto">
            <div className="flex gap-3 h-10">
              <button
                onClick={handleDelete}
                className="w-12 py-2 text-white bg-green-500 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                삭제
              </button>
              <button
                onClick={() =>
                  alert(
                    `선택된 ${selectedBooks.length}권의 책을 ${quantityToAdd}권씩 추가합니다.`
                  )
                }
                className="w-12 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                추가
              </button>
            </div>
            <div className="mt-4 mb-4">
              <input
                type="number"
                value={quantityToAdd}
                onChange={(e) => setQuantityToAdd(Math.max(1, +e.target.value))}
                className="p-2 w-1/2 border border-gray-300 rounded"
              />
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

          {/* 페이지 번호 */}
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
