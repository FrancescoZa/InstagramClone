import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../style/Home.css";

import axios from "axios";
import Post from "../components/Post";
import AsideMenu from "../components/AsideMenu";
import Story from "../components/Story";
import MyVerticallyCenteredModal from "../components/CreateStory";

const Home = () => {
  const [modalShow, setModalShow] = useState(false);

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

  const [stories, setStories] = useState([
    {
      id: "",
      username: "",
      proPic: "",
      image: "",
      created_at: "",
      user_id: "",
    },
  ]);

  const checkAuth = () => {
    if (document.cookie.split(";").length !== 2) {
      navigate("/login");
    }
  };

  let data = [];
  let data_stories = [];

  async function getStories() {
    let res = await axios.get("/api/stories/");
    data_stories = res.data;
    //console.log(data_stories);
    setStories(data_stories);
  }

  async function getPosts() {
    let res = await axios.get("/api/posts/?id=-1");

    data = res.data;
    console.log(data);

    setPosts(data);
  }

  useEffect(() => {
    checkAuth();
    getPosts();
    getStories();
  }, []);

  useEffect(() => {
    console.log(stories);
  }, [stories]);

  let users_stories = [];

  return (
    <>
      <AsideMenu></AsideMenu>
      <section id="contentContainer">
        <section id="storiesAndPostsContainer">
          <section id="storiesContainer">
            <section className="addCenter">
              <button onClick={() => setModalShow(true)} id="addStory">
                <span>+</span>
              </button>
              <span>New</span>
            </section>
            {(() => {
              let rows = [];
              for (let i = 0; i < stories.length; i++) {
                if (!users_stories.includes(stories[i].user_id)) {
                  rows.push(
                    <Story
                      key={stories[i].id}
                      stories={stories}
                      storyIndex={i}
                    />
                  );
                  users_stories.push(stories[i].user_id);
                }
              }
              return rows.reverse();
            })()}
          </section>
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Home;
