import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/LoginStyle.css";
import axios from "axios";
const RegisterForm = ({ setislogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (
      username !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        setErrorMsg("");

        //api

        axios
          .post("/api/users/", {
            username: username,
            email: email,
            password: password,
          })
          .then((res) => {
            if (res.status === 201) {
              document.getElementById("registerForm").reset();
            }
          });
        //api
      } else {
        setErrorMsg("Passwords are not the same");
      }
    } else {
      setErrorMsg("Fill all the fields");
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <>
      <Form onSubmit={submit} id="registerForm">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onInput={handleUsername}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onInput={handleEmail}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onInput={handlePassword}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onInput={handleConfirmPassword}
          />
        </Form.Group>

        <Button id="loginBtn" variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
      <span id="errorMsg">{errorMsg}</span>
      <span>
        Already have an account? <a onClick={() => setislogin(true)}>Log in</a>
      </span>
    </>
  );
};

export default RegisterForm;
