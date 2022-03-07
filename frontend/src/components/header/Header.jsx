import "./header.css";
import { Slide } from 'react-slideshow-image';
export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Share Your Thoughts</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src='https://static.vecteezy.com/system/resources/previews/002/043/628/original/new-modernism-aesthetic-in-poster-design-card-brutalism-inspired-graphics-in-web-template-layouts-made-with-abstract-geometric-shapes-useful-for-poster-art-website-header-digital-print-vector.jpg'
        alt="img"
      />
    </div>
  );
}
