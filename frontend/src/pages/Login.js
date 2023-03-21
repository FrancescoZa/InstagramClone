import { Link } from "react-router-dom";
import "../style/LoginStyle.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <section id="body">
        <div id="phonesContainer">
          <img src={require("../images/phone.png")}></img>
        </div>

        <div id="formContainer">
          <div id="box">
            <div id="logoContainer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
            </div>

            {isLogin ? (
              <LoginForm setislogin={setIsLogin} />
            ) : (
              <RegisterForm setislogin={setIsLogin} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
