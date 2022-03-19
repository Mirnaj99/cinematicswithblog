import SideBar from "../../components/sidebar/SideBar";
import "./settings.css";
import {  useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Settings() {
  const { user, dispatch } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const PF = "http://localhost:4000/images/";



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      file,
      email,
      password,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data,{
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      } catch (err) {}
    }
    try {
      
    const res =  await  axios.put("/users/" + user._id, updatedUser, {
      headers: {
        token:
          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    res.data.accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);

    } catch (err) {
      
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/users/" + user._id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
     
      dispatch({ type: "LOGOUT" });
      
    } catch (err) {}
  };

  return (
    
   
    <div className="settings">
    <ul className="topListset">
      <li className="topListItemset">
            <Link  to="/">
            <i class="topIconset backset fa-solid fa-angles-left link"></i>
            </Link>
          </li>
          </ul>
      <div className="settingsWrapper">
     
        <div className="settingsTitle">
     
          <span className="settingsUpdateTitle" >Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm"  onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
          <img
            src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
            <i className="settingsPPIcon fa-regular fa-user"></i>
            </label>
            <input type="file" className="settingsPPInput" id="fileInput" style={{display:"none"}} 
              onChange={(e) => setFile(e.target.files[0])}
            />
            </div>
            <label className="username">Username: {user.username} </label>
            <label>Email</label>
            <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder="*********" onChange={e => setPassword(e.target.value)}  />
            <button className="settingsSubmit button" type="submit">
                Update
            </button>
            {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
     
    </div>
    
  );
}
