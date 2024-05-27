import "./VectorJ.css";
import React, { useEffect, useRef } from 'react';
import { TweenMax, Power1 } from "gsap";

const VectorJ = () => {

  const rocketRef = useRef(null);

  useEffect(() => {
    const rocket = rocketRef.current;

    TweenMax.to(rocket, { duration: 0, delay: 10 });
    // Початковий поворот ракети
    TweenMax.set(rocket, { rotation: -245 });

    // Анімація руху ракети з поворотом
    TweenMax.to(rocket, 2, {  x: '-=380', y: '+=50' }); // Поворот та рух вліво та вниз
    TweenMax.to(rocket, 2, { rotation: -280, x: '-=60', y: '+=60', delay: 1 }); // Додатковий поворот та рух вліво та вниз
    TweenMax.to(rocket, 2, { rotation: -360, x: '+=300', y: '+=370', delay: 1 }); // Поворот та рух вправо
  }, []);


  return (
    <section className="vector-j">
      <div className="wrapper-star-animate2">
        <img className="star-animate-icon2" alt="" src="/star-animate-2.svg" />
      </div>
      <b className="b6">Відправлення Онлайн Зараз</b>
      <div className="div8">Відкрити сторінку</div>
      <div className="text-n">
        <div className="frame-p-wrapper">
          <div className="frame-p">
            <img className="frame-q-icon" alt="" src="/frame-q.svg" />
            <img
              ref={rocketRef}
              className="frame-p-child"
              loading="eager"
              alt=""
              src="/group-41@2x.png"
            />
          </div>
        </div>
      </div>
      <div className="frame-s">
        <b className="b7">Послуги</b>
        <b className="b8">Питання</b>
      </div>
    </section>
  );
};

export default VectorJ;
