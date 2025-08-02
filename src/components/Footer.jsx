import React, { useEffect, useState } from "react";
import {
  addCommentAPI,
  AddReplyCommentAPI,
  deleteCommentAPI,
  getAllCommentsAPI,
} from "../service/allApi";
import DeleteModal from "./DeleteModal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Footer = () => {
  const [user,setUser]=useState('')
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [showModal, setShowModal] = useState(false); //for delete modal component
  const [userDetails, setUserDetails] = useState({}); //to store the usedetails for (Delete a comment)
  // console.log("userDetails", userDetails);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setUser(user)
    fetchComments();
  }, [sessionStorage.getItem("user")]);
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

  // adding an comment
  const handleAddComment = async () => {
    if (comment.trim() === "") return;
    try {
      let newComment = {
        userId: user.id,
        username: user.username,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        comment,
        reply: [],
      };
      const res = await addCommentAPI(newComment);
      console.log("comment res", res);
      if (res.status >= 200 && res.status < 300) {
        setComment("");
        fetchComments();
      }
    } catch (error) {
      console.log("error to add a comment : ", error);
    }
  };

  // to add an reply to a specific comment
  const handleAddReply = async (commentId) => {
    const replyComment = reply.trim();
    if (!replyComment) return;
    try {
      const newReplyComment = {
        userId: user?.id,
        username: user?.username,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        replyComment,
      };
      let com = comments.find((item) => item.id === commentId);
      // console.log("com", com);
      if (!com) return console.log("comment not found");
      com.reply.push(newReplyComment);

      const res = await AddReplyCommentAPI(commentId, com);
      // console.log("replay response", res);
      fetchComments();
      setReply('')
    } catch (error) {
      console.log("error to add reply comment : ", error);
    }
  };

  const handleDeleteUser = async () => {
    console.log("comment deleting ", userDetails);
    try {
      const res = await deleteCommentAPI(userDetails?.id);
      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        toast.success("comment deleted successfully ")
        setUserDetails({})
        fetchComments();
      }
    } catch (error) {
      console.log("error to delete a comment (Footer.jsx) : ", error);
    }

    setShowModal(false);
  };
  return (
    <div className="bg-dark w-100 mt-4 p-3">
      <div className="d-flex justify-content-center align-items-center ">
        <span className="text-white px-3 py-2 fs-5 text-center ">
          &copy; {new Date().getFullYear()} protected by afreed
        </span>
      </div>
      <h5 className="text-white my-4 text-center ">Add a Comment</h5>
      {user && (
        <div className="d-flex gap-2">
          <input
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
          />
          <button className="btn btn-success" onClick={handleAddComment}>
            Submit
          </button>
        </div>
      )}

      {/* comment section */}

      <h3 className="text-white mt-4 text-start ms-3">All Comments</h3>
      <div className="row gap-3 ps-2" >
        {comments?.length > 0 &&
          comments.map((c, index) => (
            <div
              key={index}
              className="mb-3 ms-3 pt-2 pb-2 text-white mt-2 col-sm-3 text-center"
              style={{
                border: "1px solid white",
                borderRadius: "10px",
                width: "auto",
              }}
            >
              <strong className="text-warning">{c?.username}</strong> |{" "}
              <small className="text-warning">{c?.date}</small> |{" "}
              <small className="text-warning">{c?.time}</small>
              {
                user?.id===c.userId &&(
                  <i
                    style={{ cursor: "pointer" }}
                    className="fa-solid fa-user-pen ms-2"
                  ></i>
                )
              }
              {
                user?.id==c.userId&&(
                  <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-trash text-danger ms-2"
                onClick={() => {
                  setShowModal(true);
                  setUserDetails(c);
                }}
              ></i>
                )
              }
              
              <p
                className="pb-2"
                style={{ maxWidth: "200px", borderBottom: "1px solid white" }}
              >
                - {c?.comment}
              </p>
              {c.reply?.length > 0 && (
                <div className="ms-3 mt-2">
                  <strong>- Replies:</strong>
                  {c.reply.map((rep, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 mt-1"
                      style={{
                        border: "1px solid white",
                        borderRadius: "10px",
                        width: "auto",
                      }}
                    >
                      <strong className="text-info">{rep?.username}</strong> |{" "}
                      <small className="text-info">{rep?.date}</small> |{" "}
                      <small className="text-info">{rep?.time}</small>
                      <p className="mb-1">{rep?.replyComment}</p>
                    </div>
                  ))}
                </div>
              )}
              {user && (
                <div className="d-flex gap-2 mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write a reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleAddReply(c?.id)}
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <DeleteModal
        message={"are you sure do you want to delete this comment ? "}
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setUserDetails({});
        }}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default Footer;
