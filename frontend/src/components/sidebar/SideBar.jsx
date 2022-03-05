import "./sidebar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SideBar() {
  const [categ, setCategorie] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    axios
      .get("/posts/",{
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((response) => {
        setCategorie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayData = () => {
    let uniquecateg = categ.filter(
      (ele, ind) =>
        ind ===
        categ.findIndex(
          (elem) =>
            elem.id === ele.id &&
            elem.category.toLowerCase() === ele.category.toLowerCase()
        )
    );
    return uniquecateg.map((data) => {
      return (
        <li key={data._id} className="sidebarListItem">
          <Link to={`/blog/?cat=${data.category}`} className="link">
            {data.category}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">{displayData()}</ul>
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
