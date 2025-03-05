"use client";

import React from "react";
import AddComponent from "./_component/AddComponent";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <AddComponent />;
    </QueryClientProvider>
  );
}
