import Posts from "../../components/posts/Posts";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import "./homepage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  const filter = search.split("=")[1];

  if (search.split("=")[0] == "?cat") {
    var filterName = "Category:";
  } else if (search.split("=")[0] == "?user") {
    var filterName = "Author:";
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

  return (
    <>
      <Header />
      <h1 className="filter">
        {filterName} {filter}
      </h1>
      <div className="homeblog">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  );
}
