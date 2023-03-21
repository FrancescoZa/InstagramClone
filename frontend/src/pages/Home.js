import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../style/Home.css";

import axios from "axios";
import Post from "../components/Post";
import AsideMenu from "../components/AsideMenu";

const Home = () => {
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

  const checkAuth = () => {
    if (document.cookie.split(";").length !== 2) {
      navigate("/login");
    }
  };

  let data = [];

  async function getPosts() {
    let res = await axios.get("/api/posts/?id=-1");

    data = res.data;
    console.log(data);

    setPosts(data);
  }

  useEffect(() => {
    checkAuth();
    getPosts();
  }, []);

  return (
    <>
      <AsideMenu></AsideMenu>
      <section id="contentContainer">
        <section id="storiesAndPostsContainer">
          <section id="storiesContainer"></section>
          <section id="postsContainer">
            {(() => {
              let rows = [];
              for (let i = 0; i < posts.length; i++) {
                rows.push(<Post key={posts[i].id} post={posts[i]} index={i} />);
              }
              return rows.reverse();
            })()}
          </section>
        </section>
        <section id="friendsContainer"></section>
      </section>
    </>
  );
};

export default Home;
