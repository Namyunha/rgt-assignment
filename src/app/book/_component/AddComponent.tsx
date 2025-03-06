"use client";

import React, { useState } from "react";
import AddForm from "../_component/AddForm";

export default function AddComponent() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-3xl mx-auto my-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">책 등록하기</h2>

      {/* 수량 입력 */}
      <div className="mb-4">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          수량
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          onChange={(e) => {
            const newQuantity = +e.target.value;
            if (newQuantity > 5) {
              alert("최대 5개까지 등록 가능합니다.");
              return;
            }
            if (newQuantity < 1) {
              alert("1이하로 입력하실 수 없습니다.");
              return;
            }
            setQuantity(newQuantity);
          }}
          value={quantity}
        />
        <p className="text-gray-500 text-sm mt-2">
          최대 5개까지 등록 가능합니다.
        </p>
      </div>

      {/* AddForm 컴포넌트 전달 */}
      <AddForm quantity={quantity} setQuantity={setQuantity} />
    </div>
  );
}
