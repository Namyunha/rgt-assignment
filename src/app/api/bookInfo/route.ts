import { NextRequest, NextResponse } from "next/server";
import firestore from "@/app/database/firestroe";
import { doc, getDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id } = body; // 요청 바디에서 id 추출
  console.log("id = ", id);

  if (!id) {
    return NextResponse.json(
      { message: "조회 되는 id가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const bookDocRef = doc(firestore, "books", id);
    const bookDoc = await getDoc(bookDocRef);

    if (!bookDoc.exists()) {
      return NextResponse.json(
        { message: "조회하고자 하는 책이 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json(bookDoc.data());
  } catch (error) {
    console.error("조회 실패:", error);

    return NextResponse.json({ message: "조회 실패" }, { status: 500 });
  }
}
