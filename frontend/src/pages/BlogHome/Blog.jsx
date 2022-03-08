import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import TopBar from "../../components/topbar/TopBar";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  if (search.includes("%20")) {
    var filter = search.split("=")[1].replace(/%20/g, " ");
    console.log(filter);
  } else {
    var filter = search.split("=")[1];
  }

  if (search.split("=")[0] === "?movie") {
    var filterName = "Movie:";
  } else if (search.split("=")[0] === "?user") {
    var filterName = "Author:";
  } else if (search.split("=")[0] === "?serie") {
    var filterName = "Serie:";
  }

  useEffect(() => {
    window.scrollTo(0, 600);
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const displayData =  () => {
    if (posts.length == 0) {
      return (
        <span className="noposts">
          <p>No Posts Found..</p>
          <Link to="/write" className="link">
            {" "}
            <p>Be The First To Share Your Thoughts About "{filter}"</p>{" "}
          </Link>
        </span>
      );
    }
  };

  return (
    <>
      <TopBar />
      <Header />
      <h1 className="filter">
        <span className="filtername">{filterName}</span> {filter}
      </h1>

      <div className="homeblog">
        {displayData()}
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
}
