// src/pages/Blogs.jsx
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
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { addReply } from "../firebase"; // Make sure addReply is exported
import { Link } from "react-router-dom";

const Blogs = () => {
  const { user, isAdmin } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});

  // Fetch blogs + comments + replies
  const fetchBlogs = async () => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const blogData = await Promise.all(
      querySnapshot.docs.map(async (d) => {
        const commentsSnap = await getDocs(collection(db, "blogs", d.id, "comments"));
        const comments = await Promise.all(
          commentsSnap.docs.map(async (c) => {
            const repliesSnap = await getDocs(collection(db, "blogs", d.id, "comments", c.id, "replies"));
            const replies = repliesSnap.docs.map((r) => ({ id: r.id, ...r.data() }));
            return { id: c.id, ...c.data(), replies };
          })
        );
        return { id: d.id, ...d.data(), comments };
      })
    );

    setBlogs(blogData);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Admin adds a new blog
  const handleAddBlog = async () => {
    if (!isAdmin) return alert("Only admins can add blogs!");
    if (!newBlog.title.trim() || !newBlog.content.trim()) return;

    await addDoc(collection(db, "blogs"), {
      title: newBlog.title,
      content: newBlog.content,
      author: user?.displayName || "Admin",
      createdAt: serverTimestamp(),
      likes: 0,
    });

    setNewBlog({ title: "", content: "" });
    fetchBlogs();
  };

  // Like a blog
  const handleLike = async (id, currentLikes) => {
    const blogRef = doc(db, "blogs", id);
    await updateDoc(blogRef, { likes: (currentLikes || 0) + 1 });
    fetchBlogs();
  };

  // Add comment
  const handleAddComment = async (blogId) => {
    if (!commentInputs[blogId]?.trim()) return;

    await addDoc(collection(db, "blogs", blogId, "comments"), {
      text: commentInputs[blogId],
      author: user?.displayName || "Guest",
      createdAt: serverTimestamp(),
    });

    setCommentInputs({ ...commentInputs, [blogId]: "" });
    fetchBlogs();
  };

  // Add reply
  const handleAddReply = async (blogId, commentId) => {
    if (!replyInputs[commentId]?.trim()) return;

    await addReply(blogId, commentId, {
      text: replyInputs[commentId],
      author: user?.displayName || "Guest",
      createdAt: serverTimestamp(),
    });

    setReplyInputs({ ...replyInputs, [commentId]: "" });
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-2">Blog Posts</h1>
          <p className="text-zinc-600">Discover stories and ideas</p>
        </div>

        {/* Admin: Add Blog */}
        {isAdmin && (
          <div className="bg-white border-2 border-black p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-black">Create New Post</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                placeholder="Enter blog title..."
                className="w-full border-2 border-black px-4 py-3 bg-white text-black focus:outline-none focus:ring-0"
              />
              <textarea
                rows="6"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                placeholder="Write your blog content..."
                className="w-full border-2 border-black px-4 py-3 bg-white text-black focus:outline-none focus:ring-0 resize-none"
              />
              <button
                onClick={handleAddBlog}
                className="bg-black text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors duration-200"
              >
                Publish Post
              </button>
            </div>
          </div>
        )}

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white border-2 border-black">
              {/* Blog Header */}
              <div className="p-8 border-b-2 border-zinc-200">
                <h2 className="text-2xl font-bold mb-3 text-black">
                  <Link 
                    to={`/blogs/${blog.id}`} 
                    className="hover:text-zinc-700 transition-colors duration-200"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-zinc-800 mb-4 leading-relaxed">{blog.content}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600 font-medium">By {blog.author}</span>
                  <button
                    onClick={() => handleLike(blog.id, blog.likes)}
                    className="bg-black text-white px-4 py-2 font-medium hover:bg-zinc-800 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-sm">♥</span>
                    <span>{blog.likes || 0}</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="p-8">
                <h3 className="text-lg font-bold mb-6 text-black">
                  Comments ({blog.comments?.length || 0})
                </h3>
                
                <div className="space-y-6">
                  {blog.comments?.length > 0 ? (
                    blog.comments.map((c) => (
                      <div key={c.id} className="border-l-4 border-zinc-300 pl-6">
                        <div className="mb-4">
                          <span className="font-bold text-black">{c.author}</span>
                          <p className="text-zinc-800 mt-1 leading-relaxed">{c.text}</p>
                        </div>

                        {/* Replies */}
                        {c.replies?.length > 0 && (
                          <div className="ml-6 space-y-3 mb-4">
                            {c.replies.map((r) => (
                              <div key={r.id} className="border-l-2 border-zinc-200 pl-4">
                                <span className="font-semibold text-zinc-700">{r.author}</span>
                                <p className="text-zinc-600 mt-1">{r.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Reply */}
                        {user && (
                          <div className="ml-6 flex gap-0">
                            <input
                              type="text"
                              value={replyInputs[c.id] || ""}
                              onChange={(e) => setReplyInputs({ ...replyInputs, [c.id]: e.target.value })}
                              placeholder="Write a reply..."
                              className="flex-1 border-2 border-black px-3 py-2 bg-zinc-50 focus:outline-none focus:ring-0"
                            />
                            <button
                              onClick={() => handleAddReply(blog.id, c.id)}
                              className="bg-black text-white px-4 py-2 font-medium hover:bg-zinc-800 transition-colors duration-200 border-2 border-black border-l-0"
                            >
                              Reply
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-zinc-500 font-medium text-center py-4">No comments yet</p>
                  )}
                </div>

                {/* Add Comment */}
                {user && (
                  <div className="mt-8 pt-6 border-t-2 border-zinc-200">
                    <div className="flex gap-0">
                      <input
                        type="text"
                        value={commentInputs[blog.id] || ""}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [blog.id]: e.target.value })
                        }
                        placeholder="Write a comment..."
                        className="flex-1 border-2 border-black px-4 py-3 bg-white focus:outline-none focus:ring-0"
                      />
                      <button
                        onClick={() => handleAddComment(blog.id)}
                        className="bg-black text-white px-6 py-3 font-medium hover:bg-zinc-800 transition-colors duration-200 border-2 border-black border-l-0"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="bg-white border-2 border-black p-16 text-center">
            <h3 className="text-xl font-bold text-black mb-2">No posts yet</h3>
            <p className="text-zinc-600">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;