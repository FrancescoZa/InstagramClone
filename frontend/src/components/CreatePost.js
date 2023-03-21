import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../style/CreatePost.css";
import React, { useState } from "react";
import axios from "axios";

export default function MyVerticallyCenteredModal(props) {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [desc, setDesc] = useState("");

  const getCookieValue = (name) =>
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

  function handleFileSelect(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleDescription(e) {
    setDesc(e.target.value);
  }

  function onUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", desc);
    formData.append("user_id", getCookieValue("user_id"));
    formData.append("image", selectedFile);
    axios.post("/api/posts/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    props.onHide();
    window.location.reload(true);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Upload an image</Form.Label>
          <Form.Control
            onChange={handleFileSelect}
            type="file"
            accept="image/png, image/jpeg"
            size="sm"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Insert a description</Form.Label>
          <Form.Control onInput={handleDescription} as="textarea" rows={3} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button id="closeBtn" onClick={props.onHide}>
          Close
        </Button>
        <Button onClick={onUpload}>Upload</Button>
      </Modal.Footer>
    </Modal>
  );
}
