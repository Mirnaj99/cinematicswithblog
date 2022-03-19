import { useState } from "react";
import storage from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./newMovie.css";
import { createMovie } from "../../context/movieContext/ApiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import {Link} from "react-router-dom";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);
  const changeHandler = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    if (!items) return;
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(` Upload is ${progress}   % done `);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const uploadHandler = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={changeHandler}
          />
        </div>

        <div className="addProductItem">
          <label>Descrption</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={changeHandler}
          />
        </div>

        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="year"
            name="year"
            onChange={changeHandler}
          />
        </div>

        <div className="addProductItem">
          <label>Genre</label>
            <select name="genre" id="genre" onChange={changeHandler}>
            <option >Genre</option>
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={changeHandler}
          />
        </div>
        <div className="addProductItem">
          <label>IMDB</label>
          <input
            type="text"
            placeholder="IMDB Link"
            name="imdb"
            onChange={changeHandler}
          />
        </div>
        <div className="addProductItem">
          <label>Rating</label>
          <input
            type="text"
            placeholder="Rating"
            name="rating"
            onChange={changeHandler}
          />
        </div>

        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={changeHandler}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <Link to = "/movies">
          <button className="addProductButton button" onClick={submitHandler}>
            Create
          </button>
          </Link>
        ) : (
          <button className="addProductButton button" onClick={uploadHandler}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
