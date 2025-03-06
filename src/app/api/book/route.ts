import { NextResponse } from "next/server";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import firestore from "@/app/database/firestroe";

// POST 요청: 책 등록
export async function POST(req: Request) {
  const booksRef = collection(firestore, "books");
  const { bookList } = await req.json();
  for (const { id, title, author, quantity } of bookList) {
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
    const numberQuantity = +quantity;
    // 책이 없다면, 새 책 등록
    await addDoc(booksRef, {
      id,
      title,
      author,
      quantity: numberQuantity,
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

// 책 수량 업데이트
export async function PATCH(req: Request) {
  const { title, quantity } = await req.json();
  const booksRef = collection(firestore, "books");

  // title을 통해 책 조회
  const bookQuery = query(booksRef, where("title", "==", title));
  const getResult = await getDocs(bookQuery);

  // 해당 책이 존재하지 않으면 에러 반환
  if (getResult.empty) {
    return new NextResponse(
      JSON.stringify({
        message: `"${title}"을 찾을 수 없습니다.`,
      }),
      { status: 404 }
    );
  }

  // 책이 존재하면 수량 업데이트
  const bookDoc = getResult.docs[0];
  const bookRef = doc(firestore, "books", bookDoc.id);

  try {
    // 기존 수량에 새로운 수량 추가
    const updatedQuantity = +quantity;

    await updateDoc(bookRef, {
      quantity: updatedQuantity,
    });

    const response = {
      message: "수량을 반영하였습니다.",
    };
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("수량 업데이트 실패:", error);
    return new NextResponse(
      JSON.stringify({ message: "책 수량 업데이트 실패" }),
      { status: 500 }
    );
  }
}

// 책 삭제하기
export async function DELETE(req: Request) {
  const { title } = await req.json();
  console.log("server title = ", title);
  // Firestore에서 해당 책 ID로 책을 조회
  const booksRef = collection(firestore, "books");
  const bookQuery = query(booksRef, where("title", "==", title));
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
