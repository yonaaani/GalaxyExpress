import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, CarouselSlide, useAnimationOffsetEffect } from '@mantine/carousel';
import { Progress } from '@mantine/core';
import '@mantine/core/styles.css'; 
import '@mantine/carousel/styles.css';
import GroupComponent1 from "./GroupComponent1";
import GroupComponent from "./GroupComponent";
import "./GroupU.css";

const GroupU = () => {
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
    <div className="group-u" id="delivery">
            <div className="div7">
            <span>{number}</span>
              <span className="span2">{` `}</span>
              <span className="span3">з</span>
              <span className="span4">{` `}</span>
              <span>2</span>
            </div>
    <div className="custom-scrollbar">
      <Progress
        value={scrollProgress}
        maw={320}
        size="xs"
        mt="xl"
        mx="auto"
        color='white'
        radius='md'
        style={{ position: 'relative', zIndex: 2, background: "#9499C3", top: -85, right: 160 }}
      />
      <Carousel
        align="center"
        slideSize="23%"
        slideGap="sm"
        height="100%"
        getEmblaApi={setEmbla}
        initialSlide={2}
        withControls={false}
      >
        <Carousel.Slide>
          <GroupComponent1
            prop="Звичайна поштова доставка"
            prop1="самовивіз через відділення"
            image38="/image-38@2x.png"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <GroupComponent
            prop="Спеціалізована доставка"
            prop1="для конкретної групи товарів"
            image38="/image-38-1@2x.png"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <GroupComponent
            prop="Доставка через поштомат"
            prop1="самовивіз через поштові скриньки"
            image38="/image-38-2@2x.png"
            propPadding="var(--padding-24xl) var(--padding-18xl) var(--padding-48xl) var(--padding-19xl)"
            propGap="48px"
            propWidth="178px"
            propHeight="178px"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <GroupComponent1
            prop="Кур’єрська доставка"
            prop1="прямо до дверей клієнта"
            image38="/image-38-3@2x.png"
            ellipse="/vector-20.svg"
            propPadding="var(--padding-24xl) var(--padding-14xl) var(--padding-59xl) var(--padding-19xl)"
            propWidth="216px"
            propLeft="unset"
            propRight="0.5px"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <GroupComponent
            prop="Супер швидка доставка"
            prop1="поза чергою"
            image38="/image-38-4@2x.png"
            propPadding="var(--padding-24xl) var(--padding-18xl) var(--padding-59xl) var(--padding-19xl)"
            propGap="79px"
            propWidth="156px"
            propHeight="156px"
          />
        </Carousel.Slide>
      </Carousel>
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
    </div>
    </div>
  );
};

export default GroupU;
