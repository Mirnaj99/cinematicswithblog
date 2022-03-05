import "./navbar.scss";
import logo from "./logo.jpg";
import img from "./img.jpg";
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthAction";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const PF = "http://localhost:4000/images/";
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/" className="link">
            <span>HomePage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <span>My List</span>
          <Link to="/blog" className="link">
            <span>Blog</span>
          </Link>
        </div>
        <div className="right">
        
          <img src={PF + user.profilePic} alt="img" />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <Link className ="link" to = "/settings">
              <span>Settings</span>
              </Link>
              <span className="link" onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
