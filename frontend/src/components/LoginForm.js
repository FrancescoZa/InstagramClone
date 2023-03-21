import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../style/LoginStyle.css";

const createCookieInHour = (cookieName, cookieValue, hourToExpire) => {
  let date = new Date();
  date.setTime(date.getTime() + hourToExpire * 60 * 60 * 1000);
  document.cookie =
    cookieName + " = " + cookieValue + "; expires = " + date.toGMTString();
};

const LoginForm = ({ setislogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const login = (e) => {
    e.preventDefault();
    setEmail();
    axios.get("/api/users/").then((res) => {
      console.log(res.data);
      let id;
      let found = false;

      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].email === email && res.data[i].password === password) {
          id = res.data[i].id;
          found = true;
        }
      }

      if (found === true) {
        setErrorMsg("");
        navigate("/home");
        createCookieInHour("user_id", id, 1); //1 hour
      } else {
        setErrorMsg("Wrong credentials");
      }
    });
  };

  const emailHandle = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const passwordHandle = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  return (
    <>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onInput={emailHandle}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onInput={passwordHandle}
          />
        </Form.Group>

        <Button id="loginBtn" variant="primary" type="submit">
          Log in
        </Button>
      </Form>
      <span id="errorMsg">{errorMsg}</span>

      <span>
        Don't have an account yet?{" "}
        <a onClick={() => setislogin(false)}>Sign up</a>
      </span>
    </>
  );
};

export default LoginForm;
