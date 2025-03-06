"use client";

import React from "react";
import { useBookInfoQuery } from "@/service/query/book";

export default function Book({ id }: { id: string }) {
  const { data } = useBookInfoQuery(id);
  console.log("data = ", data);
  return <div>Book ${id}</div>;
}
