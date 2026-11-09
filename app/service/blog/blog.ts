import type { User } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "~/config/firebase";

export async function createBlog(user: User, title: string, body: string) {
    const blogRef = doc(collection(db, "users", user.uid, "blogs"));
    await setDoc(blogRef, {
        id: blogRef.id,
        title: title,
        body: body,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function getAllBlogs(user: User) {
    const blogRef = collection(db, "users", user.uid, "blogs");
    const q = query(blogRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getBlogById(user: User, blogId: string) {
    const blogRef = doc(db, "users", user.uid, "blogs", blogId);
    const snapshot = await getDoc(blogRef);
    if (!snapshot.exists()) return null;
    return snapshot.data();
}

export async function updateBlog(user: User, blogId: string, title: string, body: string) {
    if (!blogId) throw new Error("Blog ID is required");
    const blogRef = doc(db, "users", user.uid, "blogs", blogId);
    await updateDoc(blogRef, {
        title: title,
        body: body,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteBlog(user: User, blogId: string) {
    const docRef = doc(db, "users", user.uid, "blogs", blogId);
    await deleteDoc(docRef);
}
