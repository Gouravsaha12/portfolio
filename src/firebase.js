import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// 🔑 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfu1DQtwCF4OqpeFAfgwNG6g0BxTXflkM",
  authDomain: "projects-gourav.firebaseapp.com",
  projectId: "projects-gourav",
  storageBucket: "projects-gourav.firebasestorage.app",
  messagingSenderId: "307476656006",
  appId: "1:307476656006:web:4a76f800fc06a7088a8607",
  measurementId: "G-G2Q95GPRCQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Enable analytics if supported
let analytics;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

// Firestore
export const db = getFirestore(app);

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Helpers
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Add a reply to a comment
export const addReply = async (blogId, commentId, replyData) => {
  return await addDoc(collection(db, "blogs", blogId, "comments", commentId, "replies"), replyData);
};

// Get all replies for a comment
export const getReplies = async (blogId, commentId) => {
  const q = query(collection(db, "blogs", blogId, "comments", commentId, "replies"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export default app;