import React, { useState } from "react";
import FrameComponent1 from "../components/FrameComponent1";

const LoginRecoveryPage = () => {
  const [login, setLogin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handleLoginRecoverySubmit = async () => {
    try {
      const response = await fetch('http://localhost:4443/galaxy-express/User/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
        }),
      });

      if (response.ok) {
        setSuccess('Login recovery instructions sent to your email');
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send login recovery instructions');
        setSuccess('');
      }
    } catch (error) {
      console.error('An error occurred while recovering login:', error);
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="authorization">
      <main className="star-animate-parent">
        <img
          className="image-22-icon"
          loading="lazy"
          alt=""
          src="/image-22@2x.png"
        />
        <section className="wrapper-star-animate-parent">
          <div className="wrapper-star-animate1">
            <img
              className="star-animate-icon1"
              alt=""
              src="/star-animate.svg"
            />
          </div>
          <img
            className="group-5logo-11"
            loading="lazy"
            alt=""
            src="/group-5logo-1@2x.png"
          />
        </section>
      </main>
      <div className="authorization-inner">
        <FrameComponent1 />
      </div>
      <div className="frame-parent11">
        <div className="frame-wrapper11">
          <div className="parent">
            <h3 className="h3">Відновлення логіну</h3>
            <div className="divv">Введіть новий логін</div>
          </div>
        </div>
        <div className="frame-wrapper-reg">
          <div className="rectangle-parent-reg">
            <div className="frame-item-reg" />
            <div className="country-code-wrapper-reg">
              <b className="country-code-reg">Логін</b>
            </div>
            <input
              className="login-reg"
              placeholder=""
              type="text"
              value={login}
              onChange={handleLoginChange}
            />
          </div>
        </div>
        <div className="frame-wrapper1">
          <button className="group-button-auth" onClick={handleLoginRecoverySubmit}>
            <div className="frame-child1" />
            <b className="b1">Відновити логін</b>
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default LoginRecoveryPage;
