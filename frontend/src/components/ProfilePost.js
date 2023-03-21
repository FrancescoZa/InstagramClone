import "../style/ProfilePost.css";
import { BsHeartFill } from "react-icons/bs";
import { TfiComment } from "react-icons/tfi";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePost = ({ post, index }) => {
  const [liked, setLiked] = useState(-1);
  const [n_likes, set_n_likes] = useState(0);

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

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

  return (
    <>
      <div className="mb-4" id="container">
        <div id="dummy"></div>
        <div id="element">
          <img src={post.image} />
          <section id="info">
            <div>
              <BsHeartFill /> {n_likes}
            </div>
            <div>
              <TfiComment /> {post.comments.length}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProfilePost;
