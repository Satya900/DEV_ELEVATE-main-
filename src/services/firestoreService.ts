import { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseClient";

export async function safeGetDoc<T>(path: string): Promise<T | null> {
  try {
    const ref = doc(db, path);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? (snapshot.data() as T) : null;
  } catch (error) {
    console.error("Firestore getDoc error:", error);
    return null;
  }
}

export async function safeGetCollection<T>(path: string): Promise<T[]> {
  try {
    const ref = collection(db, path);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(d => d.data() as T);
  } catch (error) {
    console.error("Firestore getCollection error:", error);
    return [];
  }
}

export async function safeSetDoc(path: string, data: unknown) {
  try {
    const ref = doc(db, path);
    await setDoc(ref, data);
    return true;
  } catch (error) {
    console.error("Firestore setDoc error:", error);
    return false;
  }
}

export async function safeUpdateDoc(path: string, data: unknown) {
  try {
    const ref = doc(db, path);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    console.error("Firestore updateDoc error:", error);
    return false;
  }
}

export async function safeDeleteDoc(path: string) {
  try {
    const ref = doc(db, path);
    await deleteDoc(ref);
    return true;
  } catch (error) {
    console.error("Firestore deleteDoc error:", error);
    return false;
  }
}
