import { Link } from "react-router-dom";
import "./FrameComponent1.css";

const FrameComponent1 = () => {
  return (
    <div className={`container`}>
      <h3 className="h31-auth">Ще не зареєстровані?</h3>
      <div className="parent1-auth">
        <div className="div3-auth">Створіть ваш Акаунт щоб</div>
        <div className="div4-auth">
          <ul className="ul-auth">
            <li className="li">переглядати всі посилки;</li>
            <li className="li1">створювати/відслідковувати посилку;</li>
            <li className="li2">отримувати кешбек;</li>
            <li>отримувати/придбати подарункові марки;</li>
          </ul>
        </div>
      </div>
      <Link to="/registration" style={{ textDecoration: 'none', color: 'inherit', zIndex: '5' }}>
      <button className="rectangle-parent1-auth">
        <div className="frame-child2-auth" />
        <b className="b2-authh">Зареєструватись зараз</b>
      </button>
      </Link>
    </div>
  );
};

export default FrameComponent1;