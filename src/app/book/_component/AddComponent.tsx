"use client";

import React, { useState } from "react";
import AddForm from "../_component/AddForm";

export default function AddComponent() {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      책 등록하기
      <div className="flex flex-col w-xl gap-2">
        <div>
          수량:
          <input
            className="border-black border-2"
            type="number"
            onChange={(e) => {
              const newQuantity = +e.target.value;
              if (newQuantity > 5) {
                alert("최대 5개까지 등록 가능합니다.");
                return;
              }
              setQuantity(newQuantity);
            }}
            value={quantity}
          />
        </div>
        <AddForm quantity={quantity} setQuantity={setQuantity} />
      </div>
    </>
  );
}
