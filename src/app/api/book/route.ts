import { NextResponse } from "next/server";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import firestore from "@/app/database/firestroe";

export async function POST(req: Request) {
  const { title } = await req.json();
  const booksRef = collection(firestore, "books");

  // 이미 등록된 책인지 조회
  const storedBook = query(booksRef, where("title", "==", title));
  const getResult = await getDocs(storedBook);
  if (!getResult.empty) {
    const response: { message: string } = {
      message: "이미 사용 중인 책입니다.",
    };
    return new Response(JSON.stringify(response), { status: 409 });
  }
  await addDoc(booksRef, {
    title,
  });
  const response: { message: string } = { message: "책등록 성공" };
  return new NextResponse(JSON.stringify(response), { status: 201 });
}
