import "./searchMovie.scss";
import React from "react";
import { Link } from "react-router-dom";

const MovieData = ({ movies }) => {
  return (
    <div className="movieData">
      {movies.map((movie) => (
        <div key={movie._id}>
          <div className="movieLists">
            <span>{movie.title}</span>

            <div>
              <Link
                to={`/details/${movie.title}`}
                state={{ movie: movie }}
                className="link"
              >
                
                <img
                  className="imgsearch"
                  width="200"
                  height={120}
                  src={movie.img}
                />
              </Link>
            </div>

            <span>({movie.year})</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieData;

