import React, { useRef, useState } from "react";
import "./register.scss";
import logo from "../../components/Navbar/logo.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    const [failure, setFailure] = useState(false);


  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const userNameRef = useRef();

  const startHandler = (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
  };

  const finishHandler = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUserName(userNameRef.current.value);
    try {
      await axios.post("auth/register", { email, username, password });
      navigate("/login");
    } catch (err)  {
      setFailure(true)
      if (err.response.status === 400) {
        setErrorMessage(err.response.data.message);
      }
      if (err.response.status === 404) {
        setErrorMessage("Please Fill All The Fields");
      }
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="logo" />
          </div>
          <div className="right">
          <Link to="/login">
            <button className="loginButton button">Sign In</button>
          </Link>
          </div>
      </div>

      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        {!email ? (
          <div className="input">
            <input type="email" placeholder="Email Address" ref={emailRef} />
            <button className="registerButton button" onClick={startHandler}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="username" placeholder="Username" ref={userNameRef} />
            <input type="password" className="pass" placeholder="Password" ref={passwordRef} />
            <button className="registerButton button" onClick={finishHandler}>
              Start
            </button>
          </form>
        )}
        {failure && (
          <span
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
              fontSize: "20px",
            }}
          >
            Error : {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};

export default Register;
