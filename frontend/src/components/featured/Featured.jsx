import "./featured.scss";
import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  const genreChangeHandler = (e) => {
    setGenre(e.target.value);
    window.scrollTo(0, 400);
  };

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={genreChangeHandler}>
            <option className="option" value="random">
              Genre
            </option>
            <option className="option" value="adventure">
              Adventure
            </option>
            <option className="option" value="action">
              Action
            </option>
            <option className="option" value="comedy">
              Comedy
            </option>
            <option className="option" value="crime">
              Crime
            </option>
            <option className="option" value="fantasy">
              Fantasy
            </option>
            <option className="option" value="historical">
              Historical
            </option>
            <option className="option" value="horror">
              Horror
            </option>
            <option className="option" value="romance">
              Romance
            </option>
            <option className="option" value="sci-fi">
              Sci-fi
            </option>
            <option className="option" value="thriller">
              Thriller
            </option>
            <option className="option" value="western">
              Western
            </option>
            <option className="option" value="animation">
              Animation
            </option>
            <option className="option" value="drama">
              Drama
            </option>
            <option className="option" value="documentary">
              Documentary
            </option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="img" />
      <div className="info">
        <img src={content?.imgTitle} alt="" />
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <Link to="/watch" className="link" state={{movie:content}}>
            {" "}
            <button className="play button">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <Link to={`/details/${content?.title}`} className="link" state={{movie:content}} >
          <button className="more button">
            <InfoOutlined />
            <span>Info</span>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
