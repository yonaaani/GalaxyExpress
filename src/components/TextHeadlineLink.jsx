import { useCallback } from "react";
import "./TextHeadlineLink.css";
import { Link } from "react-router-dom";

const TextHeadlineLink = () => {

  return (
    <section className="text-headline-link">
      <div className="text-headline-subscribe-parent">
        <div className="text-headline-subscribe" />
        <div className="spaceship">
          
          <img
                className="star-animate-icon1"
                alt=""
                src="/star-animate-1.svg"
              />
          <img
            className="spacex-3d-model-render"
            alt=""
            src="/spacex-3d-model-render.png"
          />
          
          <button className="rectangle-container">
            <div className="frame-inner" />
            <Link to="/authorization"><b className="log-in">Log In</b></Link>
          </button>
          <button className="group-button">
            <div className="rectangle-div" />
            <Link to="/registration"><b className="sign-up">{`Sign Up `}</b></Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TextHeadlineLink;
