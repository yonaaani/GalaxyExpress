import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import "./ConfirmEmailPage.css";

const ConfirmEmailPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { token: tokenFromUrl } = useParams(); // Extract token from URL path

  useEffect(() => {
    if (tokenFromUrl) {
      // Make API call to confirm email
      fetch(`http://localhost:4443/api/User/ConfirmEmail/${tokenFromUrl}`)
        .then(response => {
          if (response.ok) {
            // If the request is successful, set isSuccess to true
            return response.json();
          } else {
            // If the request fails, handle the error
            throw new Error('Failed to confirm email.');
          }
        })
        .then(data => {
          // Handle success response
          console.log('Email підтверджено!');
          setIsSuccess(true);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error confirming email:', error.message);
        });
    } else {
      console.log('Token not found in URL parameters.');
    }
  }, [tokenFromUrl]);

  const handleRedirect = () => {
    if (isSuccess) {
      // Redirect to success page or any other page as needed
      window.location.href = '/';
    }
  };

  return (
    <div className="registration">
      <div className="registration-inner">
        <div className="frame-parent-reg">
          <div className="parent-reg">
            <h1 className="h1-reg">Реєстрація</h1>
            <p className="p-reg">
              Зареєструйтесь, щоб отрмати доступ до нових можливостей, замовити
              послуги та сплатити посилку онлайн
            </p>
          </div>
          <div className="ivanna-stashko-wrapper-reg">
            <b className="ivanna-stashko-reg">Ivanna Stashko</b>
          </div>
        </div>
      </div>
      <main className="star-animate-parent-reg">
        <img className="star-animate-icon" alt="" src="/star-animate@2x.png" />
        <img
          className="image-22-icon"
          loading="lazy"
          alt=""
          src="/image-22@2x.png"
        />
        <section className="wrapper-star-animate-parent-reg">
          <div className="wrapper-star-animate-reg">
            <img
              className="star-animate-icon1-reg"
              alt=""
              src="/star-animate-1.svg"
            />
          </div>
          <img
            className="group-5logo-1"
            loading="lazy"
            alt=""
            src="/group-5logo-1@2x.png"
          />
        </section>
        <img className="frame-child-reg" alt="" src="/group-42@2x.png" />
      </main>
      <div className="group-reg-confirm-email">
        <b className="b-reg">Підтвердіть свій емайл для реєстрації</b>
        <div className="wrapper-reg">
          <div className="div-reg">
            При натисненні на "Підвердити" зможете ввійти в систему
          </div>
        </div>
        <div className="frame-wrapper-reg">
          <div className="frame-container-reg">
            <div className="rectangle-container-reg" onClick={handleRedirect}>
              <div className="rectangle-div-reg" />
              <b className="b1-reg">Підвердити</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
