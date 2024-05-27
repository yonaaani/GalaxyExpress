import FrameComponent from "../components/FrameComponent";
import CountOFPeople from "../components/CountOFPeople";
import TextHeadlineLink from "../components/TextHeadlineLink";
import VectorJ from "../components/VectorJ";
import GroupU from "../components/GroupU";
import Vector from "../components/Vector";
import Text1 from "../components/Text1";
import RegistrationFrame from "../components/RegistrationFrame";
import NewFrame from "../components/NewFrame";
import ContentBox from "../components/ContentBox";
import "./Main.css";
import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Element } from 'react-scroll';

const Main = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState(null);
  

  const handleScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);

    if (progress === 1) {
      setNumber(2);
    } else {
      setNumber(1);
    }

  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla]);

  const [number, setNumber] = useState(1);

  return (
    <div className="main">
      <header className="main-content">
        <img
          className="group-5logo-1"
          loading="eager"
          alt=""
          src="/group-5logo-1@2x.png"
        />
      </header>
      <Element name="golovna" className="element"></Element>
      <div className="div3"><Link to="golovna" smooth={true} duration={500}>Головна</Link></div>
      <div className="div4"><Link to="dostavka" smooth={true} duration={500}>Доставка</Link></div>
      <div className="div5"><Link to="departments" smooth={true} duration={500}>Наші відділення</Link></div>
      {/* Початкова.Main1 */}
      <FrameComponent />
      {/* Початкова.Main2.Доставка */}
      <Element name="dostavka" className="element"><CountOFPeople /></Element>
      <div className="frame-marketing-info">
        <div className="wrapper-star-animate">
          <img className="star-animate-icon" alt="" src="/star-animate.svg" />
        </div>
        <Element name="departments" className="element"><h1 className="h1">Наші відділення</h1></Element>
      </div>
      <TextHeadlineLink />
      {/* Початкова.Main2.Карточки */}
      <GroupU />
      <Vector />
      <section className="rectangle">
        <div className="group">
          <Text1 />
          <Carousel 
          loop
          style={{ width: '100vw', margin: 0, padding: 5 }}
          withControls={false}
          getEmblaApi={setEmbla}
          initialSlide={0}
          >
           <Carousel.Slide>
             <RegistrationFrame />
           </Carousel.Slide>
           <Carousel.Slide>
           <NewFrame />
           </Carousel.Slide>
          </Carousel>
        </div>
        <img
  className="arrows"
  src="/vector-19.svg"
  onClick={() => {
    console.log('Scrolling prev');
    embla && embla.scrollPrev();
  }}
/>
<img
  className="arrows2"
  src="/vector-20.svg"
  onClick={() => {
    console.log('Scrolling next');
    embla && embla.scrollNext();
  }}
/>
      </section>
      <VectorJ />
      <ContentBox />
    </div>
  );
};

export default Main;
