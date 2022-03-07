import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import "./watch.scss";

const Watchtrailer = () => {
  const location = useLocation();
  const {movie} = location.state
  window.scroll(0,0)
  console.log(location)

  return (
    <div className="watch">
       <Link to={`/details/${movie.title}`} state={{movie:movie}}>
        <div className="back">
          <ArrowBackOutlined />
          
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.trailer}
      />
    </div>
  );
};

export default Watchtrailer;
