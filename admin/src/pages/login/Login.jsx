import React, { useContext } from "react";
import { useState } from "react";
import login from "../../context/authContext/ApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
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
      <form className="loginForm">
        <input
          type="text"
          value={email}
          placeholder="Email"
          className="loginInput"
          onChange={emailChangeHandler}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="loginInput"
          onChange={passwordChangeHandler}
        />
        <button
          onClick={loginHandler}
          className="loginBtn"
          disabled={isFetching}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
