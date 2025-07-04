import React, { useEffect, useState } from "react";
import { API_GET, API_POST } from "./api_ops";
import { v4 as uuidv4 } from 'uuid';
import "./comments.css"

// entry point for the comment section
export function CommentSection({ postID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let isMounted = true;
    async function GetData() {
      let data = await API_GET(postID, "placeholder");
      if (isMounted) {
        const sorted = [...data].sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setComments(sorted);
      }
    }
    GetData();
    return () => { isMounted = false; }
  }, [postID])

  function addNewComment(comment) {
    setComments(prev => [...prev, comment]);
  }

  return (
    <div className="comment-card">
      <h1>Comments</h1>
      <AddComment postID={postID} onCommentSubmit={addNewComment} />
      {comments.map((comment) => (
        <Comment key={comment.ID} comment={comment} />
      ))}
    </div>
  );

}

// component for adding a new comment or reply
function AddComment({ postID, onCommentSubmit }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    const date = new Date().toISOString(); // Full ISO timestamp for sorting
    const newComment = {
      "name": name,
      "date": date,
      "comment": comment,

      "postID": postID,
      "parentID": null,
      "ID": uuidv4().toString(),
      
      "depth": 0,
      "isAdmin": false
    };
    API_POST(newComment);
    onCommentSubmit(newComment);
    setName("");
    setComment("");
  };

  return (
    <form className="input">
      <h3>Add a comment</h3>
      <input type="text" placeholder="Name" className="name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Comment" className="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}


function Comment({ comment }) {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `${dateStr}    ${timeStr}`;
  };

  return (
    <div className="comment">
      <div className="label">
        <div className="name">{comment.name}</div>
        <div className="date">{formatDate(comment.date)}</div>
      </div>
      <div className="text">{comment.comment}</div>
    </div>
  )
}