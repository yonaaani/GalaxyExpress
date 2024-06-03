import "./Text1.css";
import { Link } from "react-router-dom";

const Text1 = () => {
  return (
    <div className="text2-text1">
      <div className="wrapper-star-animate4">
        <img className="star-animate-icon4" alt="" src="/star-animate.svg" />
      </div>
      <div className="image1-text1">
        <div className="container-text1">
          <div className="div12">
            Персональні акаунти, де кожен користувач може оформлювати,
            відстежувати посилки, їхні деталі та історію
          </div>
          <Link to="/authorization" style={{ textDecoration: 'none', color: 'inherit' }}><button className="rectangle-parent6">
            <div className="frame-child9" />
            <b className="b12">Увійдіть для відстеження</b>
          </button>
          </Link>
        </div>
      </div>
    
    </div>
  );
};

export default Text1;
