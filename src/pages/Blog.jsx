// src/pages/Blog.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { addReply } from "../firebase";

const Blog = () => {
  const { id } = useParams(); // blogId from URL
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  // Fetch blog + comments + replies
  const fetchBlog = async () => {
    const blogDoc = await getDoc(doc(db, "blogs", id));
    if (!blogDoc.exists()) return;

    const blogData = blogDoc.data();
    const commentsSnap = await getDocs(collection(db, "blogs", id, "comments"));
    const comments = await Promise.all(
      commentsSnap.docs.map(async (c) => {
        const repliesSnap = await getDocs(collection(db, "blogs", id, "comments", c.id, "replies"));
        const replies = repliesSnap.docs.map((r) => ({ id: r.id, ...r.data() }));
        return { id: c.id, ...c.data(), replies };
      })
    );

    setBlog({ id: blogDoc.id, ...blogData, comments });
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, { likes: (blog.likes || 0) + 1 });
    fetchBlog();
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    await addDoc(collection(db, "blogs", id, "comments"), {
      text: commentInput,
      author: user?.displayName || "Guest",
      createdAt: serverTimestamp(),
    });
    setCommentInput("");
    fetchBlog();
  };

  const handleAddReply = async (commentId) => {
    if (!replyInputs[commentId]?.trim()) return;

    await addReply(id, commentId, {
      text: replyInputs[commentId],
      author: user?.displayName || "Guest",
      createdAt: serverTimestamp(),
    });

    setReplyInputs({ ...replyInputs, [commentId]: "" });
    fetchBlog();
  };

  if (!blog) return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black border-t-transparent animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Blog Header */}
        <div className="bg-white border-2 border-black p-8 mb-8">
          <h1 className="text-4xl font-bold mb-6 leading-tight">{blog.title}</h1>
          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-zinc-800 leading-relaxed">{blog.content}</p>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t-2 border-zinc-200">
            <span className="text-zinc-600 font-medium">By {blog.author}</span>
            <button
              onClick={handleLike}
              className="bg-black text-white px-6 py-2 font-medium hover:bg-zinc-800 transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-lg">♥</span>
              <span>{blog.likes || 0}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white border-2 border-black">
          <div className="p-8 border-b-2 border-zinc-200">
            <h2 className="text-2xl font-bold">Comments</h2>
          </div>

          <div className="divide-y-2 divide-zinc-100">
            {blog.comments?.length > 0 ? (
              blog.comments.map((c, index) => (
                <div key={c.id} className="p-8">
                  <div className="mb-4">
                    <span className="font-bold text-black">{c.author}</span>
                    <p className="text-zinc-800 mt-2 leading-relaxed">{c.text}</p>
                  </div>

                  {/* Replies */}
                  {c.replies?.length > 0 && (
                    <div className="ml-8 space-y-4 mb-6">
                      {c.replies.map((r) => (
                        <div key={r.id} className="border-l-4 border-zinc-300 pl-6">
                          <span className="font-semibold text-zinc-700">{r.author}</span>
                          <p className="text-zinc-600 mt-1">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Reply */}
                  {user && (
                    <div className="ml-8 flex gap-0">
                      <input
                        type="text"
                        value={replyInputs[c.id] || ""}
                        onChange={(e) =>
                          setReplyInputs({ ...replyInputs, [c.id]: e.target.value })
                        }
                        placeholder="Write a reply..."
                        className="flex-1 border-2 border-black px-4 py-2 focus:outline-none focus:ring-0 bg-zinc-50"
                      />
                      <button
                        onClick={() => handleAddReply(c.id)}
                        className="bg-black text-white px-6 py-2 font-medium hover:bg-zinc-800 transition-colors duration-200 border-2 border-black border-l-0"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-zinc-500 font-medium">No comments yet</p>
              </div>
            )}
          </div>

          {/* Add Comment */}
          {user && (
            <div className="p-8 border-t-2 border-zinc-200 bg-zinc-50">
              <div className="flex gap-0">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border-2 border-black px-4 py-3 focus:outline-none focus:ring-0 bg-white"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors duration-200 border-2 border-black border-l-0"
                >
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;