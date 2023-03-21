import axios from "axios";
import { useEffect, useState } from "react";
import AsideMenu from "../components/AsideMenu";
import ProfilePost from "../components/ProfilePost";

import "../style/Profile.css";

const Profile = () => {
  let data = [];

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
    console.log(data);
    setPosts(data);
  }

  async function getUserData() {}

  useEffect(() => {
    getPosts();
    getUserData();
  }, []);

  return (
    <>
      <AsideMenu></AsideMenu>
      <section id="profileContentContainer">
        <section id="profileHeader">
          <div id="profilePicContainer">
            <img src="https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg"></img>
          </div>
          <div id="profileInfoContainer">
            <div>
              <span id="profileName">Francesco</span>
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
                  <div className="col">
                    <ProfilePost key={posts[i].id} post={posts[i]} index={i} />
                  </div>
                );
                if ((i + 1) % 3 === 0) rows.push(<div className="w-100"></div>);
              }

              let index = posts.length + 1;
              while (index % 3 !== 0) {
                index = index + 1;
              }
              let difference = index - posts.length;

              rows = rows.reverse();

              for (let i = 0; i < difference; i++) {
                rows.push(<div className="col"></div>);
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
