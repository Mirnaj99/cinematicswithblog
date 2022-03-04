import React, { useContext, useState } from "react";
import "./login.scss";
import logo from "../../components/Navbar/logo.jpg";
import login from "../../authContext/ApiCalls";
import { AuthContext } from "../../authContext/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();

    login({ email, password }, dispatch);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or Phone Number"
            onChange={emailChangeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
          />
          <button className="loginButton" onClick={loginHandler}>
            Sign In
          </button>
          <span>
            New to Netflix <b> Sign Up Now </b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
