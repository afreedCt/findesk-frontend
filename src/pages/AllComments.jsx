import React, { useEffect, useState } from "react";
import {
  AddReplyCommentAPI,
  deleteCommentAPI,
  getAllCommentsAPI,
} from "../service/allApi";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  console.log(comments);

  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    try {
      const res = await getAllCommentsAPI();
      // console.log(res);
      if ((res.status >= 200 && res.status, 300)) {
        setComments(res.data);
      }
    } catch (error) {
      console.log("error to get all comments : ", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      console.log(commentId);

      const res = await deleteCommentAPI(commentId);
      console.log("comment delted", res);
      if (res.status >= 200 && res.status < 300) {
        toast.success("comment deleted successfully");
        fetchComments();
      }
    } catch (error) {
      console.log("error to delete a comment (allComment) : ", error);
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    const newComment = comments.find((item) => item?.id === commentId);
    if (!newComment) {
      console.log("comment not found with this id", commentId);
    }
    newComment.reply = newComment.reply.filter(
      (item) => item?.userId !== replyId
    );
    console.log(newComment);
    try {
      const res = await AddReplyCommentAPI(commentId, newComment);
      if (res.status >= 200 && res.status < 300) {
        toast.success(`replay comment deleted successfully`);
        fetchComments();
      }
    } catch (error) {
      console.log("error to delete reply comment (AllComments)", error);
    }
  };
  return (
    <div>
      <div className="container mt-4">
        <h3>📝 All Comments</h3>

        {comments.map((comment, commentIndex) => (
          <div key={commentIndex} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>{comment.username}</h5>
              <small>{comment.date}</small>
              <p className="mt-2">{comment.comment}</p>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteComment(comment?.id)}
              >
                🗑️ Delete Comment
              </button>

              {comment.reply && comment.reply.length > 0 && (
                <div className="mt-3 ps-3 border-start">
                  <strong>Replies:</strong>
                  {comment.reply.map((reply, replyIndex) => (
                    <div
                      key={replyIndex}
                      className="d-flex justify-content-between align-items-center shadow p-3"
                    >
                      <p className="mb-1">{reply.replyComment}</p>
                      <p>{reply.username}</p>
                      <p>{reply.date}</p>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDeleteReply(comment?.id, reply?.userId)
                        }
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AllComments;
