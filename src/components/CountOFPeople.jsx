import "./CountOfPeople.css";

const CountOFPeople = () => {
  return (
    <section className="our-brands-show-life-art-cultu">
      <div className="frame-container">
        <div className="frame-wrapper">
          <div className="obsluzhuvannya-kliyentiv-parent">
            <div className="obsluzhuvannya-kliyentiv">
              <div className="authorizacia-rejestsiya">
                <div className="compania">
                  <div className="compania-child" />
                  <img className="image-3-icon" src="/image-3@2x.png" />
                </div>
                <div className="text-container-header">
                  <b className="b3">Приєднані користувачі</b>
                  <div className="frame-logo-title">163.123</div>
                </div>
              </div>
            </div>
            <div className="div1">
              <b>
                <span>{`Безкоштовна доставка від `}</span>
                <span className="span">₴</span>
              </b>
              <span className="span1">
                <b>5000</b>
                <b className="b4"> грн</b>
              </span>
            </div>
          </div>
        </div>
        <div className="text-welcome-message">
          <div className="group-link-button">
            <div className="div2">
              <b>5</b>
              <b className="b5"> видів доставки</b>
            </div>
          </div>
          <h1 className="h12">Доставка.</h1>
        </div>
      </div>
    </section>
  );
};

export default CountOFPeople;
