import "./sidebar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayData1 = () => {


    let uniquemovie = post.filter(
      (ele, ind) =>
        ind ===
        post.findIndex(
          (elem) => elem.id === ele.id && elem.movie === ele.movie
        )
    );
    return uniquemovie.map((data) => {
      if(data.serie===""){
      return (
        <option key={data._id} value={`/blog/?movie=${data.movie}`}> {data.movie}</option>
      );
      }
    });
  };

  const displayData2 = () => {


    let uniqueserie = post.filter(
      (ele, ind) =>
        ind ===
        post.findIndex(
          (elem) => elem.id === ele.id && elem.serie === ele.serie
        )
    );
    return uniqueserie.map((data) => {
      if(data.movie===""){
      return (
        <option key={data._id} value={`/blog/?serie=${data.serie}`}> {data.serie}</option>
      );
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">MOVIES / SERIES</span>
        <select className="sidebarSelect"   onChange={(event) => handleChange(event.target.value)}>
          <option selected="true" disabled="disabled">Choose A Movie</option>
          {displayData1()}
        </select>
        <select className="sidebarSelect"   onChange={(event) => handleChange(event.target.value)}>
          <option  selected="true" disabled="disabled">Choose A Serie</option>
          {displayData2()}
        </select>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>

        <img
          className="sidebarImg"
          src="https://1dthzw2lgnfe39pywr20zgap-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/Minimalist-Line-Drawing-Woman-Back.jpg"
          alt="img"
        />
        <p>
          If a photographer's aesthetic pictures are identifiable by their
          style, or the post-processing they do to make their pictures pop, then
          that photographer has a strong aesthetic.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-facebook-square"></i>
          <i className="sidebarIcon fa-brands fa-instagram-square"></i>
          <i className="sidebarIcon fa-brands fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
