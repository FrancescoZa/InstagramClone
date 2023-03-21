import React, { useEffect, useState } from "react";
import "../style/Post.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";
import { TfiComment } from "react-icons/tfi";
import axios from "axios";
import Comment from "./Comment";
import Modal from "react-bootstrap/Modal";

const Post = ({ post, index }) => {
  function timeDifference(current, previous) {
    let currentDate = new Date(Date.parse(current));
    let previousDate = new Date(Date.parse(previous));

    current = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );

    previous = new Date(
      previousDate.getFullYear(),
      previousDate.getMonth() + 1,
      previousDate.getDate(),
      previousDate.getHours(),
      previousDate.getMinutes(),
      previousDate.getSeconds()
    );

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30; //correggere per giorni 31 e 28;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + "s";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + "m";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + "h";
    } else if (elapsed < msPerMonth) {
      return "" + Math.round(elapsed / msPerDay) + "d";
    } else if (elapsed < msPerYear) {
      return "" + Math.round(elapsed / msPerMonth) + "m";
    } else {
      return "" + Math.round(elapsed / msPerYear) + "y";
    }
  }

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [liked, setLiked] = useState(-1);
  const [n_likes, set_n_likes] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  async function getNewComments() {
    let res = await axios.get("/api/posts/?id=-1");
    setComments(res.data[index].comments);
    console.log(comments);
  }

  async function getLikes() {
    let current_user_id = getCookieValue("user_id");
    let res = await axios.get("/api/likes/");

    for (let i = 0; i < res.data.length; i++) {
      if (
        res.data[i].user_id == current_user_id &&
        res.data[i].post_id == post.id
      ) {
        setLiked(res.data[i].id);
      }

      if (res.data[i].post_id == post.id) {
        set_n_likes(n_likes + 1);
      }
    }
  }

  useEffect(() => {
    getLikes();
  }, []);

  async function postLike() {
    if (liked === -1) {
      //no liked
      const resp = await axios.post("/api/likes/", {
        user_id: post.user_id,
        post_id: post.id,
      });

      if (resp.status === 201) {
        setLiked(resp.data.id);
        set_n_likes(n_likes + 1);
      }
    } else {
      //liked
      const resp = await axios.delete("/api/likes/" + liked + "/", {
        user_id: post.user_id,
        post_id: post.id,
      });

      if (resp.status === 204) {
        setLiked(-1);
        set_n_likes(n_likes - 1);
      }
    }
  }

  async function deletePost() {
    const resp = await axios.delete("/api/posts/" + post.id + "/", {
      id: post.id,
    });
  }

  async function postComment(e) {
    e.preventDefault();

    const resp = await axios.post("/api/comments/", {
      user_id: post.user_id,
      post_id: post.id,
      comment: comment,
    });
    if (resp.status === 201) {
      getNewComments();
      document.getElementById("commentForm").reset();
      console.log(comments);
    }
  }

  const commentHandle = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <section id="post">
        <section id="header">
          <div>
            {(() => {
              if (post.proPic === null) {
                return (
                  <img
                    alt="proPic"
                    src={
                      "https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
                    }
                  />
                );
              } else {
                return <img alt={"proPic"} src={post.proPic} />;
              }
            })()}
            <span id="username">{post.username}</span>
            <span id="time">
              {timeDifference(new Date().toLocaleString(), post.created_at)}
            </span>
          </div>
          <HiOutlineDotsHorizontal id="moreIcon" onClick={() => handleShow()} />
        </section>
        <img alt={"post_pic"} id="image" src={post.image} />
        <section id="interactiveBar">
          <button onClick={() => postLike()}>
            {liked === -1 ? (
              <BsHeart className="iconInteractiveBar" />
            ) : (
              <BsHeartFill className="iconInteractiveBar red" />
            )}
            {/* <BsHeartFill className="iconInteractiveBar" /> */}
          </button>
          <button
            onClick={() => {
              if (!showComments) setShowComments(true);
              else setShowComments(false);
            }}
          >
            <TfiComment className="iconInteractiveBar" />
          </button>
        </section>
        <span id="likesTo">Likes to {n_likes} people</span>
        <br />
        <div id="descriptionContainer">
          <span>
            <strong>{post.username}</strong>
            {post.description}
          </span>
        </div>
        <form onSubmit={postComment} id="commentForm">
          <input
            placeholder="Write a comment"
            type={"text"}
            onInput={commentHandle}
          ></input>
          <input type="submit" hidden />
        </form>
        {!showComments ? (
          <span onClick={() => setShowComments(true)} id="showComments">
            Show {comments.length} comments
          </span>
        ) : (
          <>
            <span onClick={() => setShowComments(false)} id="showComments">
              Hide comments
            </span>
            <br />
            {(() => {
              let rows = [];
              for (let i = 0; i < comments.length; i++) {
                rows.push(
                  <Comment key={comments[i].id} comment={comments[i]} />
                );
              }
              return rows.reverse();
            })()}
          </>
        )}
        <br />
      </section>
      <Modal show={showModal} onHide={handleClose} centered>
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body id="modal">
          <button
            onClick={() => {
              deletePost();
              handleClose();
              window.location.reload(true);
            }}
            style={{
              borderRadius: "10px 10px 0px 0px",
              color: "red",
              fontWeight: "bold",
              borderBottom: "1px solid rgba(0, 0, 0, 0.348)",
            }}
          >
            Delete
          </button>
          <button
            style={{
              borderRadius: "0px 0px 10px 10px",
            }}
          >
            Edit
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Post;
