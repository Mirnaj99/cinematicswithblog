import "./singlepost.css";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";

export default function SinglePost() {
  const PF = "http://localhost:4000/images/";
  const [post, setPost] = useState({});
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    window.scroll(0,0);
    const getPost = async () => {
      const res = await axios.get("/posts/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);

    };
    getPost();
    
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        "/posts/" + id,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        },
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/blog");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(
        "/posts/" + id,
        {
          username: user.username,
          title,
          desc,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      window.location.reload();
      setUpdateMode(false);
    
    } catch (err) {}

    
  };
 
  if(post.movie==""){
    var filter="serie";
    var filtertitle=post.serie;
  }
  else  if(post.serie==""){
    var filter="movie";
    var filtertitle=post.movie;
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      <h1 className="singlePostMovie">
<Link to={`/blog/?${filter}=${filtertitle}`} className="link">
  <b> {filtertitle} </b>  <b className="rate">({post.rating}  <i className="fa-solid fa-star starrate"></i>)</b>
</Link>
</h1>
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
           
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-solid fa-pencil"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/blog/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
        
          
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton button" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
