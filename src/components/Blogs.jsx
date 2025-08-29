// src/components/Blogs.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  increment,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Blogs = () => {
  const { user, isAdmin } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [commentInputs, setCommentInputs] = useState({});

  // Fetch blogs with comments
  const fetchBlogs = async () => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const blogData = await Promise.all(
      querySnapshot.docs.map(async (d) => {
        const commentsSnap = await getDocs(collection(db, "blogs", d.id, "comments"));
        const comments = commentsSnap.docs
          .map((c) => ({ id: c.id, ...c.data() }))
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        return { id: d.id, ...d.data(), comments };
      })
    );
    setBlogs(blogData);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const displayNameOrEmail = (u) => {
    if (!u) return "Anonymous";
    return u.displayName || u.email || "Unnamed";
    // if you want strict email only, return u.email;
  };

  // Add a blog (Admin only via UI; rules still enforce on server)
  const handleAddBlog = async () => {
    if (!isAdmin) return; // double guard
    if (!newBlog.title.trim() || !newBlog.content.trim()) return;

    await addDoc(collection(db, "blogs"), {
      title: newBlog.title,
      content: newBlog.content,
      author: displayNameOrEmail(user),
      authorEmail: user?.email || null,
      createdAt: serverTimestamp(),
      likes: 0,
    });

    setNewBlog({ title: "", content: "" });
    fetchBlogs();
  };

  // Like a blog (must be logged in)
  const handleLike = async (id) => {
    if (!user) {
      alert("Sign in to like.");
      return;
    }
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, { likes: increment(1) });
    fetchBlogs();
  };

  // Add a comment (users + admin; admin replies are flagged)
  const handleAddComment = async (blogId) => {
    if (!user) {
      alert("Sign in to comment.");
      return;
    }
    const text = commentInputs[blogId]?.trim();
    if (!text) return;

    await addDoc(collection(db, "blogs", blogId, "comments"), {
      text,
      author: displayNameOrEmail(user),
      authorEmail: user?.email || null,
      isAdmin: !!isAdmin,
      createdAt: serverTimestamp(),
    });

    setCommentInputs({ ...commentInputs, [blogId]: "" });
    fetchBlogs();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
      {/* ADMIN: Add new blog */}
      {isAdmin && (
        <div className="mb-8 p-6 bg-white border-2 border-black rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black">Add New Blog</h2>
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            placeholder="Blog Title"
            className="border-2 border-black p-3 rounded w-full mb-3 text-black bg-white"
          />
          <textarea
            rows="5"
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            placeholder="Blog Description..."
            className="border-2 border-black p-3 rounded w-full mb-3 text-black resize-none bg-white"
          />
          <button
            onClick={handleAddBlog}
            className="bg-black text-white px-5 py-2 rounded font-medium hover:bg-gray-800 transition"
          >
            Publish Blog
          </button>
        </div>
      )}

      {/* BLOG LIST */}
      {blogs.map((blog) => (
        <div key={blog.id} className="border-2 border-black rounded-2xl p-6 mb-8 bg-white shadow">
          <h2 className="text-2xl font-bold mb-2 text-black">{blog.title}</h2>
          <p className="text-black mb-2 whitespace-pre-wrap">{blog.content}</p>
          <small className="text-gray-600">
            By {blog.author || "Unknown"}{" "}
            {blog.createdAt?.toDate
              ? `• ${blog.createdAt.toDate().toLocaleString()}`
              : ""}
          </small>

          {/* Likes */}
          <div className="mt-3">
            <button
              onClick={() => handleLike(blog.id)}
              className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
            >
              ❤️ Like ({blog.likes || 0})
            </button>
          </div>

          {/* Comments */}
          <div className="mt-5">
            <h3 className="font-semibold mb-2 text-black">Comments</h3>

            {blog.comments?.length > 0 ? (
              blog.comments.map((c) => (
                <div
                  key={c.id}
                  className={`border-b border-black py-2 text-black flex items-start justify-between gap-3`}
                >
                  <div>
                    <div className="text-sm">
                      <strong className={c.isAdmin ? "text-emerald-700" : ""}>
                        {c.author || "Unknown"}{c.isAdmin ? " (Admin)" : ""}:
                      </strong>{" "}
                      <span>{c.text}</span>
                    </div>
                    {c.createdAt?.toDate && (
                      <div className="text-xs text-gray-500">
                        {c.createdAt.toDate().toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments yet</p>
            )}

            {/* Add comment / Admin reply */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={commentInputs[blog.id] || ""}
                onChange={(e) =>
                  setCommentInputs({ ...commentInputs, [blog.id]: e.target.value })
                }
                placeholder={isAdmin ? "Write an admin reply..." : "Write a comment..."}
                className="border-2 border-black p-2 rounded w-full bg-white text-black"
              />
              <button
                onClick={() => handleAddComment(blog.id)}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                {isAdmin ? "Reply" : "Comment"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
