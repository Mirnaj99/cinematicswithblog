import "./navbar.scss";
import logo from "./logo.jpg";
import img from "./img.jpg";
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link, NavLink} from "react-router-dom";
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
          <NavLink to="/" className="link" activeclassname="active">
            <img src={logo} alt="logo" />
          </NavLink>
          <NavLink to="/" className="link" activeclassname="active">
            <span>HomePage</span>
          </NavLink>
          <NavLink to="/series" className="link" activeclassname="active">
            <span>Series</span>
          </NavLink>
          <NavLink to="/movies" className="link" activeclassname="active">
            <span>Movies</span>
          </NavLink>
          <NavLink to="/mylist" className="link" activeclassname="active">
          <span>My List</span>
          </NavLink>
          <NavLink to="/blog" className="link" activeclassname="active">
            <span>Blog</span>
          </NavLink>
        </div>
        <div className="right">
        <Link to="/search" className="link">
            <Search className="icon" />
          </Link>
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
