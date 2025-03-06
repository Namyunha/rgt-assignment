import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import firestore from "@/app/database/firestroe";

// POST 요청: 책 등록
export async function POST(req: Request) {
  const booksRef = collection(firestore, "books");
  const { bookList } = await req.json();
  for (const { title, author, quantity } of bookList) {
    // 책이 이미 존재하는지 확인 (title, author가 일치하는지)
    const bookQuery = query(
      booksRef,
      where("title", "==", title),
      where("author", "==", author)
    );
    const getResult = await getDocs(bookQuery);
    if (!getResult.empty) {
      // 이미 등록된 책이 있다면, 새로 등록하지 않음
      const response: { message: string } = {
        message: `"${title}" by ${author}는 이미 등록되어 있습니다.`,
      };
      return new NextResponse(JSON.stringify(response), { status: 409 });
    }
    // 책이 없다면, 새 책 등록
    await addDoc(booksRef, {
      title,
      author,
      quantity,
    });
  }

  const response: { message: string } = {
    message: "책 등록 성공",
  };
  return new NextResponse(JSON.stringify(response), { status: 201 });
}

// 책 목록 가져오기
export async function GET() {
  const booksRef = collection(firestore, "books");
  const getResult = await getDocs(booksRef);
  const books = getResult.docs.map((doc) => doc.data());
  return new NextResponse(JSON.stringify(books), { status: 200 });
}

// 책 삭제하기
export async function DELETE(req: Request) {
  const { title } = await req.json();
  // Firestore에서 해당 책 ID로 책을 조회
  const booksRef = collection(firestore, "books");
  const bookQuery = query(booksRef, where("id", "==", title));
  const getResult = await getDocs(bookQuery);
  // 해당 책이 존재하지 않을 때
  if (getResult.empty) {
    return new NextResponse(
      JSON.stringify({
        message: `"${title}"을 찾을 수 없습니다.`,
      }),
      { status: 404 }
    );
  }
  // 해당 책이 존재하면 삭제
  const bookDoc = getResult.docs[0];
  const bookRef = doc(firestore, "books", bookDoc.id);
  try {
    await deleteDoc(bookRef);
    const response = { message: "책 삭제 성공" };
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("삭제 실패:", error);
    return new NextResponse(JSON.stringify({ message: "책 삭제 실패" }), {
      status: 500,
    });
  }
}
