import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { AuthContext } from "../../authContext/AuthContext";
import TopBar from "../../components/topbar/TopBar";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [movie, setMovie] = useState("");
  const [serie, setSerie] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);
  const [movies, getMovies] = useState([]);
  const [selected1, setSelected1] = useState("");
  const [selected2, setSelected2] = useState("");
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);


  useEffect(() => {
    getMovie();
    console.log(rating);
  }, [rating]);

  const getMovie = () => {
    axios
      .get("/movies")
      .then((response) => {
        getMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const displayData1 = () => {
    return movies.map((m) => {
      if (m.isSeries == false) {
        return (
          <option key={m._id} value={m.title}>
            {m.title}
          </option>
        );
      }
    });
  };
  const displayData2 = () => {
    return movies.map((m) => {
      if (m.isSeries == true) {
        return (
          <option key={m._id} value={m.title}>
            {m.title}
          </option>
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      movie,
      serie,
      rating,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <>
      <TopBar />
      <div className="write">
        {file && (
          <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
        )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
            <label htmlFor="fileInput">
              <i className="writeIcon fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              name="profilePic"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="writeFormGroup">
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="writeFormGroup">
            <select
              disabled={selected2}
              name="movie"
              id="movie"
              className="writeInputMovie"
              autoFocus={true}
              onChange={(e) => {
                setMovie(e.target.value);
                setSelected1("disabled");
              }}
            >
              <option selected={true} disabled="disabled">
                Movie
              </option>
              {displayData1()}
            </select>
            <select
              disabled={selected1}
              name="serie"
              id="serie"
              className="writeInputMovie"
              autoFocus={true}
              onChange={(e) => {
                setSerie(e.target.value);
                setSelected2("disabled");
              }}
            >
              <option selected={true} disabled="disabled">
                Serie
              </option>
              {displayData2()}
            </select>
          </div>

          <div className="writeFormGroup">
            <textarea
              placeholder="Share Your Thoughts...."
              name="desc"
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              className="writeInput writeText"
            ></textarea>
          </div>
          <button className="writeSubmit button" type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
}
