import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../style/ViewStory.css";
import { MdOutlineDraw } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";

export default function MyVerticallyCenteredModalView(props) {
  const usersStories = props.stories.filter(
    (x) => x.user_id === props.stories[props.currentIndex].user_id
  );

  const [index, setI] = useState(0);

  return (
    <Modal {...props}>
      <Modal.Body id="modalView">
        <section id="barraContainer">
          {(() => {
            let rows = [];
            for (let i = 0; i < usersStories.length; i++) {
              if (index === i) {
                rows.push(<div className="barra active"></div>);
              } else {
                rows.push(<div className="barra inactive"></div>);
              }
            }
            return rows;
          })()}
        </section>
        <section id="userInfoContainer">
          <img src={usersStories[index].proPic}></img>
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
          <button onClick={() => setI(index - 1)}>indietro</button>
          <button onClick={() => setI(index + 1)}>avanti</button>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
