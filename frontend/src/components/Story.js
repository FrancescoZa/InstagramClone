import React, { useState } from "react";
import "../style/Story.css";
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModalView from "../components/ViewStory";

const Story = ({ stories, storyIndex }) => {
  const navigate = useNavigate();
  const [modalShowViewStory, setModalShowViewStory] = useState(false);

  return (
    <>
      <section className="story_container">
        <section
          onClick={() => setModalShowViewStory(true)}
          className="story notViewed"
        >
          <img src={stories[storyIndex].proPic}></img>
        </section>
        <span>{stories[storyIndex].username}</span>
      </section>
      <MyVerticallyCenteredModalView
        show={modalShowViewStory}
        stories={stories}
        currentIndex={storyIndex}
        onHide={() => setModalShowViewStory(false)}
        visible={modalShowViewStory}
      />
    </>
  );
};

export default Story;
