import "./sidebar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logo.jpg";

export default function SideBar() {
  const [post, setPost] = useState([]);
  let Navigate = useNavigate();

  function handleChange(value) {
    Navigate(`${value}`);
  }
  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = () => {
    axios
      .get("/posts/", {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayData1 = () => {
    let uniquemovie = post.filter(
      (ele, ind) =>
        ind ===
        post.findIndex((elem) => elem.id === ele.id && elem.movie === ele.movie)
    );
    return uniquemovie.map((data) => {
      if (data.serie === "") {
        return (
          <option key={data._id} value={`/blog/?movie=${data.movie}`}>
            {" "}
            {data.movie}
          </option>
        );
      }
    });
  };

  const displayData2 = () => {
    let uniqueserie = post.filter(
      (ele, ind) =>
        ind ===
        post.findIndex((elem) => elem.id === ele.id && elem.serie === ele.serie)
    );
    return uniqueserie.map((data) => {
      if (data.movie === "") {
        return (
          <option key={data._id} value={`/blog/?serie=${data.serie}`}>
            {" "}
            {data.serie}
          </option>
        );
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">MOVIES / SERIES</span>
        <select
          className="sidebarSelect"
          onChange={(event) => handleChange(event.target.value)}
        >
          <option selected={true} disabled="disabled">
            Choose A Movie
          </option>
          {displayData1()}
        </select>
        <select
          className="sidebarSelect"
          onChange={(event) => handleChange(event.target.value)}
        >
          <option selected={true} disabled="disabled">
            Choose A Serie
          </option>
          {displayData2()}
        </select>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT US</span>

        <img className="sidebarImg" src={logo} alt="img" />
        <p>
          At Cinematics, we want to entertain the world. Whatever your taste,
          and no matter where you live, we give you access to best-in-class TV
          shows, movies and documentaries. Our members control what they want to
          watch, when they want it, with no ads, in one simple subscription.
          We’re streaming in more than 30 languages and 190 countries, because
          great stories can come from anywhere and be loved everywhere. We are
          the world’s biggest fans of entertainment, and we’re always looking to
          help you find your next favorite story.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CONTACT US</span>

        <p>+961 555 555</p>
        <p>Beirut-Lebanon</p>
        <p>Cinematics@gmail.com</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          <i className="sidebarIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
