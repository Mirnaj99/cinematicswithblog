import "./header.css";
import React from "react";

const images = [
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-1614634680.jpg",
  "https://hips.hearstapps.com/hmg-prod/images/best-romcom-1615242897.jpg",
  "https://hips.hearstapps.com/hmg-prod/images/bestteenmovies-1612822987.jpg?crop=1xw:1xh;center,top&resize=1200:*",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/teen-showes-1612304250.jpg",
  "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spanish-shows-1615399264.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
];
const delay = 6000;

export default function Header() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="header">
    
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
        {images.map((data,index)=>
        
        <img className="slide" key={index} src={data}  />
        
        )}
           
       
        </div>

     
      </div>
    </div>
  );
}
