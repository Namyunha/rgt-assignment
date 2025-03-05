"use client";

import React from "react";
import { useState } from "react";

export default function Page() {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");

  const registerBook = async () => {
    await fetch("/api/book", {
      method: "post",
      body: JSON.stringify({ title }),
    });
  };
  return (
    <>
      책 등록하기
      <div className="flex flex-col w-xl gap-2">
        <div>
          수량:
          <input
            className="border-black border-2"
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
          />
        </div>
        <div>
          제목 :{" "}
          <input
            className="border-black border-2"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
          />
        </div>
        <button
          onClick={registerBook}
          className="bg-amber-200 cursor-pointer w-sm"
        >
          책등록하기
        </button>
      </div>
    </>
  );
}
