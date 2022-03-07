import {NavLink, Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";

export default function TopBar() {
  const { dispatch, user } = useContext(AuthContext);
  const PF = "http://localhost:4000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <div className="top">
      <ul className="topList">
      <li className="topListItem">
            <Link className=" back" to="/">
            <i class="topIcon fa-solid fa-angles-left link"></i>
            </Link>
          </li>
          </ul>
          </div>
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          

          <li className="topListItem">
            <NavLink className="link" to="/blog" activeclassname="active">
              POSTS
            </NavLink>
          </li>

          <li className="topListItem">
            <NavLink className="link" to="/write" activeclassname="active">
              WRITE
            </NavLink>
          </li>
          <Link to="/register" className="link" activeclassname="active">
            <li className="topListItem" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </Link>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
         
            <img className="topImg" src={PF + user.profilePic} alt="" />
         
        ) : (
          <ul className="topList">
            <Link className="link" to="/register">
              <li className="topListItem">REGISTER</li>
            </Link>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
