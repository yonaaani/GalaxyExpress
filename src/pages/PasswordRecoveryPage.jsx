import React, { useCallback, useState } from "react";
import FrameComponent1 from "../components/FrameComponent1";

const PasswordRecoveryPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType1, setPasswordType1] = useState('password');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const togglePasswordVisibility1 = () => {
    setPasswordType1((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  const handlePasswordRecoverySubmit = async () => {
    if (password === confirmPassword) {
      try {
        const response = await fetch('http://localhost:4443/galaxy-express/User', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'example@example.com', // Email користувача, якого ми хочемо оновити пароль
            values: {
              Password: password, // Новий пароль користувача
            },
          }),
        });
  
        if (response.ok) {
          setSuccess('Password recovery successful');
          setError('');
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to update password');
          setSuccess('');
        }
      } catch (error) {
        console.error('An error occurred while updating password:', error);
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    } else {
      setError('Passwords do not match');
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
            <h3 className="h3">Відновлення паролю</h3>
            <div className="divv">Введіть новий пароль двічі</div>
          </div>
        </div>
        <div className="frame-wrapper-reg">
                <div className="rectangle-parent-reg">
                  <div className="frame-item-reg" />
                  <div className="country-code-wrapper-reg">
                    <b className="country-code-reg">Пароль</b>
                  </div>
                  <input
                    className="password-reg"
                    placeholder=""
                    type={passwordType}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: 'pointer' }} />
                </div>
              </div>
              <div className="frame-wrapper-reg">
                <div className="rectangle-parent-reg2">
                  <div className="frame-item-reg" />
                  <div className="country-code-wrapper-reg">
                    <b className="country-code-reg">Повторіть пароль</b>
                  </div>
                  <input
                    className="password-reg2"
                    placeholder=""
                    type={passwordType1}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <img className="image-36-icon-reg" alt="" src="/image-22@2x2.png"
                    onClick={togglePasswordVisibility1}
                    style={{ cursor: 'pointer' }} />
                </div>
              </div>
        <div className="frame-wrapper1">
          <button className="group-button-auth" onClick={handlePasswordRecoverySubmit}>
            <div className="frame-child1" />
            <b className="b1">Змінити пароль</b>
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
