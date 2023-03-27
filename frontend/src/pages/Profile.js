import axios from "axios";
import { useEffect, useState } from "react";
import AsideMenu from "../components/AsideMenu";
import ProfilePost from "../components/ProfilePost";
import { Link, useNavigate } from "react-router-dom";

import "../style/Profile.css";

const Profile = () => {
  let data = [];

  const [username, setUsername] = useState("");
  const [pro_pic, setProPic] = useState("");
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    {
      id: "",
      description: "",
      image: "",
      user_id: "",
      comments: [],
    },
  ]);

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  async function getPosts() {
    let id = getCookieValue("user_id");
    let res = await axios.get("/api/posts/?id=" + id);

    data = res.data;
    setPosts(data);
  }

  const checkAuth = () => {
    if (document.cookie.split(";").length !== 2) {
      navigate("/login");
    }
  };

  async function getUserData() {
    let id = getCookieValue("user_id");
    let res = await axios.get("/api/users/?id=" + id);
    console.log(res.data[0]);
    setUsername(res.data[0].username);
    setProPic(res.data[0].pro_pic);
  }

  useEffect(() => {
    checkAuth();
    getPosts();
    getUserData();
  }, []);

  return (
    <>
      <AsideMenu></AsideMenu>
      <section id="profileContentContainer">
        <section id="profileHeader">
          <div id="profilePicContainer">
            <img src={pro_pic}></img>
          </div>
          <div id="profileInfoContainer">
            <div>
              <span id="profileName">{username}</span>
              <button>Edit account</button>
            </div>
            <div id="stats">
              <span>Post: </span>
              <span className="label">{posts.length}</span>
              <span>Following: </span>
              <span className="label">0</span>
              <span>Followers: </span>
              <span className="label">0</span>
            </div>
            <div style={{ marginTop: "15px" }}>
              <span style={{ fontWeight: "600" }}>Francesco Zappala</span>
            </div>
            <span>kshbdkhgdchdvdhjvdjhevj</span>
          </div>
        </section>
        <div className="container">
          <div className="row">
            {(() => {
              let rows = [];
              for (let i = 0; i < posts.length; i++) {
                rows.push(
                  <div key={posts[i].id} className="col">
                    <ProfilePost key={posts[i].id} post={posts[i]} index={i} />
                  </div>
                );
                if ((i + 1) % 3 === 0)
                  rows.push(<div key={posts[i].id} className="w-100"></div>);
              }

              let index = posts.length + 1;
              while (index % 3 !== 0) {
                index = index + 1;
              }
              let difference = index - posts.length;

              rows = rows.reverse();

              for (let i = 0; i < difference; i++) {
                rows.push(<div key={"k" + i} className="col"></div>);
              }

              return rows;
            })()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
