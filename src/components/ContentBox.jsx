import "./ContentBox.css";

const ContentBox = () => {
  const emailAddress = 'galaxy.express@gmail.com'; // Адреса електронної пошти користувача

  function handleClick() {
    window.location.href = `mailto:${emailAddress}`;
  }

  return (
    <section className="content-box">
      <div className="submenu-frame">
        <div className="dropdown-arrow">
          <div className="item-frame">
            <div className="centered-text">
              <h1 className="h15" data-scroll-to="text29">
                Це може бути корисним
              </h1>
            </div>
            <div className="send-button">
              <div className="div14">Відправлення</div>
              <div className="div15">Відстеження</div>
              <div className="sender-receiver">
                <div className="image-frame">
                  <div className="ellipse-shape">
                    <div className="support-corner">
                      <img
                        className="image-4-icon"
                        loading="eager"
                        alt=""
                        src="/image-4@2x.png"
                      />
                      <div className="image-5-parent">
                        <img
                          className="image-5-icon"
                          alt=""
                          src="/image-5@2x.png"
                        />
                        <div className="ellipse-circle" />
                        <div className="ellipse-circle1" />
                      </div>
                    </div>
                    <div className="help-center-frame">
                      <div className="client-service">
                        <div className="business-segment">
                          <b className="b14">Центр Підтримки</b>
                          <div className="customer-service">
                            <div className="div16">Обслуговування клієнтів</div>
                            <div className="div17">Авторизація/Реєстрація</div>
                          </div>
                        </div>
                        <div className="company-info">
                          <img
                            className="image-7-icon"
                            loading="eager"
                            alt=""
                            src="/image-7@2x.png"
                          />
                          <b className="b15">Компанія</b>
                          <div className="events-calendar">
                            <div className="div18">Про нас</div>
                            <div className="div19">Вакансії</div>
                          </div>
                        </div>
                      </div>
                      <div className="free-shipping">
                        <div className="business-support">
                          <b className="b16">Бізнес</b>
                          <div className="email-registration">
                            <div className="div20">
                              Обслуговування бізнес-клієнтів
                            </div>
                            <div className="div21">Сервісний гайд</div>
                          </div>
                        </div>
                        <div className="contact-info">
                          <div className="social-media">
                            <img
                              className="image-8-icon"
                              loading="eager"
                              alt=""
                              src="/image-8@2x.png"
                            />
                            <b className="b17">Новини</b>
                          </div>
                          <div className="events-list">
                            <div className="div22">Новини для клієнтів</div>
                            <div className="div23">Події</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="div24">
                    <b>
                      <span>{`Безкоштовна доставка від `}</span>
                      <span className="span5">₴</span>
                    </b>
                    <span className="span6">
                      <b>5000</b>
                      <b className="b18"> грн</b>
                    </span>
                  </div>
                </div>
                <img
                  className="image-6-icon"
                  loading="eager"
                  alt=""
                  src="/image-6@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        <footer className="delivery-info">
          <div className="delivery-info-child" />
          <div className="business-frame">
            <div className="logo-frame1">
              <img
                className="group-5logo-2"
                loading="eager"
                alt=""
                src="/group-5logo-2@2x.png"
              />
              <div className="send-email">
                <h3 className="h32">Не пропустіть кешбек</h3>
              </div>
            </div>
            <div className="footer-logo">
              <div className="newsletter">
                <div className="rectangle-parent7">
                  <div className="frame-child10" />
                  <div className="twitter-icon">
                    <div className="email-galaxyexpressgmailcom">
                      <b>{`Email     `}</b>
                      <span className="galaxyexpressgmailcom">
                        galaxy.express@gmail.com
                      </span>
                    </div>
                  </div>
                  <button className="privacy-policy">
                    <div className="privacy-policy-child" />
                    <b className="b19" onClick={handleClick}>Надіслати</b>
                  </button>
                </div>
                <div className="news-frame1">
                  <div className="news-service">
                    <b className="b20">Новини</b>
                    <b className="b21">Обслуговування</b>
                  </div>
                  <div className="vacancies-frame1">
                    <b className="b22">Вакансії</b>
                    <b className="b23">Контакти</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="free-delivery">
            <div className="frame-parent2">
              <div className="social-media-logo-parent">
                <div className="social-media-logo">
                  <b className="facebook">Facebook</b>
                  <b className="twitter">Twitter</b>
                  <b className="instagram">Instagram</b>
                </div>
                <div className="copyright-text">
                  <b className="galaxyexpress">Ⓒ2023 GalaxyExpress</b>
                </div>
              </div>
              <b className="privacy">Privacy</b>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContentBox;
