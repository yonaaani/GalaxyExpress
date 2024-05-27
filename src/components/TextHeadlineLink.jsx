import { useCallback } from "react";
import "./TextHeadlineLink.css";

const TextHeadlineLink = () => {

  const onGroupButtonClick = useCallback(() => {
    // Please sync "Authorization" to the project
  }, []);

  const onGroupButton1Click = useCallback(() => {
    // Please sync "Registration" to the project
  }, []);

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
          
          <button className="rectangle-container" onClick={onGroupButtonClick}>
            <div className="frame-inner" />
            <b className="log-in">Log In</b>
          </button>
          <button className="group-button" onClick={onGroupButton1Click}>
            <div className="rectangle-div" />
            <b className="sign-up">{`Sign Up `}</b>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TextHeadlineLink;
