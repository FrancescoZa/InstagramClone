import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../style/CreateStory.css";
import { MdOutlineDraw } from "react-icons/md";
import React, { useState } from "react";
import axios from "axios";

export default function MyVerticallyCenteredModal(props) {
  function selectFile(contentType, multiple) {
    return new Promise((resolve) => {
      let input = document.createElement("input");
      input.type = "file";
      input.multiple = multiple;
      input.accept = contentType;

      input.onchange = (_) => {
        let files = Array.from(input.files);
        if (multiple) resolve(files);
        else resolve(files[0]);
      };

      input.click();
    });
  }

  let image = "";
  let file_image;
  async function selectPicture() {
    let files = await selectFile("image/*", true);
    image = files.map((file) => (file_image = file));
    image = URL.createObjectURL(file_image);
    console.log(file_image);
    document.getElementById("image_story").src = image;
  }

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  function shareStory() {
    const formData = new FormData();
    formData.append("user_id", getCookieValue("user_id"));
    formData.append("image", file_image);
    axios.post("/api/stories/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    props.onHide();
    window.location.reload(true);
  }

  return (
    <Modal {...props}>
      <Modal.Body>
        <section id="story">
          <img
            alt="story"
            id="image_story"
            onClick={() => selectPicture()}
            src="https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Image-Upload-Icon-Graphics-10388650-1.jpg"
          ></img>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => shareStory()}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
