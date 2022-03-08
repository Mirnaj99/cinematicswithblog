import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./details.css";
import { ArrowBackOutlined } from "@material-ui/icons";

export default function Details() {
  const location = useLocation();
  const { movie } = location.state;
  window.scrollTo(0, 0);
  if (movie.isSeries == true) {
    var filter = "serie";
  } else if (movie.isSeries == false) {
    var filter = "movie";
  }
  return (
    <div className="details">
      <Link to="/">
        {" "}
        <div className="back">
          <ArrowBackOutlined />{" "}
        </div>
      </Link>

      <div>
        <img className="detailsImg" src={movie.img} alt="" />
      </div>
      <div className="detailsInfo">
        <div className="detailsInfoTop">
          <div className="detailsTitle">
            <h1>{movie.title}</h1>
          </div>
          <div className="detailsYear">
            <span style={{ marginRight: '1rem' }}><i class="fa-solid fa-star staricon"></i> {movie.rating}</span>
            <span> {movie.year}</span>
          </div>
        </div>
        <div className="detailsInfoBottom">
          <div className="detailsPlay">
            <button className="playButton button">
              <Link
                to="/watch"
                state={{ movie: movie }}
                className="watchButton linkButton"
              >
                <i class="fa-solid fa-play icon"></i>Watch Now
              </Link>
            </button>
          </div>
          <div className="detailsAddInfo">
            <span className="detailsGenre">{movie.genre}</span>
            <span className="detailsLimit">+{movie.limit}</span>
          </div>
          <div className="detailsDesc">
            <span>{movie.desc}</span>
          </div>
          <div className="detailsGoto">
            <div className="detailsGotoItem ">
              <Link to="/watchtrailer "   state={{ movie: movie }} className="link">
                <div className="detailsIcon ">
                  <i class="fa-brands fa-youtube iconDetails  "></i>
                </div>
              </Link>
              <div className="detailsIconSpan ">Trailer</div>
            </div>
            <div className="detailsGotoItem ">
                
              <div className="detailsIcon link"  onClick={(e) =>window.open(`${movie.imdb}`)}>
                <i class="fa-brands fa-imdb iconDetails "></i>
              </div>
             
              <div className="detailsIconSpan  ">IMDB</div>
            </div>
            <div className="detailsGotoItem">
              <div className="detailsIcon">
                <i class="fa-solid fa-plus iconDetails "></i>
              </div>
              <div className="detailsIconSpan  ">My List</div>
            </div>
            <div className="detailsGotoItem">
              <div className="detailsIcon">
                <Link to={`/blog/?${filter}=${movie.title}`} className="link">
                  <i class="fa-solid fa-blog iconDetails link"></i>
                </Link>
              </div>
              <div className="detailsIconSpan ">View Blog</div>
            </div>
            <div className="detailsGotoItem">
              <div className="detailsIcon">
                <Link to="/write" className="link">
                  <i class="fa-solid fa-feather-pointed iconDetails link"></i>
                </Link>
              </div>

              <div className="detailsIconSpan ">Share you Thoughts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
