import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./listcard.css";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";

export default function Listcard({ item }) {
  const [movie, setMovie] = useState({});
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    console.log("fetching movies...");
    getMovieDetails();
    console.log("item: ", item);
  }, [item]);

  useEffect(() => {
    console.log("movie: ", movie);
  }, [movie]);

  const handleRemove = async (e) => {
    e.preventDefault();

    const updatedList = {
      mylist: movie._id,
    };
    console.log("updatedList:", updatedList);
    try {
      //mish hayde lezem mylist mish user.id?
      const res = await axios.put(
        "/users/removelist/" + user._id,
        updatedList,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(err);
    }
  };

  const getMovieDetails = () => {
    axios
      .get("/movies/find/" + item, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <figure className="card">
      <Link
        to={`/details/${movie.title}`}
        state={{ movie: movie }}
        className="link"
      >
        <img src={movie.img} className="mylistimg" />
      </Link>
      <figcaption>
        <i
          onClick={handleRemove}
          className="mylistIcon fa-solid fa-trash-can"
        ></i>
      </figcaption>
      <figcaption>{movie.title}</figcaption>
    </figure>
  );
}
