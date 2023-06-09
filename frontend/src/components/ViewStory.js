import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../style/ViewStory.css";
import { MdOutlineDraw } from "react-icons/md";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyVerticallyCenteredModalView(props) {
  const usersStories = props.stories.filter(
    (x) => x.user_id === props.stories[props.currentIndex].user_id
  );

  const [index, setI] = useState(0);
  const [abort, setAbort] = useState(false);

  async function progressLoading() {
    try {
      var progressBar = document.querySelector(".progress");
      for (var i = 2; i <= 10; i++) {
        progressBar.style.width = i * 10 + "%"; // set progress
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(progressBar.style.width);
      if (progressBar.style.width === "100%") {
        if (index < usersStories.length - 1) {
          setI(index + 1);
        } else {
          props.onHide();
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (props.visible)
      setTimeout(() => {
        progressLoading();
      }, 100);
  });

  const { currentIndex, visible, ...newProps } = props;

  return (
    <Modal {...newProps}>
      <Modal.Body id="modalView">
        <section id="barraContainer">
          {(() => {
            let rows = [];
            for (let i = 0; i < usersStories.length; i++) {
              if (index === i) {
                rows.push(
                  <div key={"barra" + i} className="barra active">
                    <div key={"loading" + i} className="progress"></div>
                  </div>
                );
              } else {
                rows.push(
                  <div key={"barra" + i} className="barra inactive"></div>
                );
              }
            }
            return rows;
          })()}
        </section>
        <section id="userInfoContainer">
          <img alt="proPic" src={usersStories[index].proPic}></img>
          <span>{usersStories[index].username}</span>
        </section>
        <section id="story">
          <img
            alt="story"
            id="image_story_view"
            src={usersStories[index].image}
          ></img>
        </section>
        <section id="actionButtons">
          <button
            onClick={() => {
              if (index >= 1) {
                setI(index - 1);
              } else {
                props.onHide();
              }
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setAbort(true);
              if (index < usersStories.length - 1) {
                setI(index + 1);
              } else {
                props.onHide();
              }
            }}
          >
            Next
          </button>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
