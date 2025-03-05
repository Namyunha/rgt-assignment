import { NextResponse } from "next/server";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import firestore from "@/app/database/firestroe";

export async function POST(req: Request) {
  const { bookList } = await req.json();
  const booksRef = collection(firestore, "books");

  // 이미 등록된 제목인지 확인
  for (const { title } of bookList) {
    const book = query(booksRef, where("title", "==", title));
    const getResult = await getDocs(book);

    if (!getResult.empty) {
      const response: { message: string } = {
        message: `"${title}"은 이미 등록되어 있습니다.`,
      };
      return new Response(JSON.stringify(response), { status: 409 });
    }
  }

  // 책 등록
  for (const { title, author } of bookList) {
    await addDoc(booksRef, {
      title,
      author,
    });
  }

  const response: { message: string } = { message: "책 등록 성공" };
  return new NextResponse(JSON.stringify(response), { status: 201 });
}
