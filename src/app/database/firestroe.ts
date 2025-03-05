import { firebaseApp } from "./firebasedb";
import { getFirestore, Firestore } from "firebase/firestore";

// Firestore 인스턴스 생성
const firestore: Firestore = getFirestore(firebaseApp);

export default firestore;
