import { useCallback } from "react";
import React, { useState } from 'react';
import "./FrameComponent.css";

const FrameComponent = () => {
  const onRectangleClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='text29']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <section className="main-inner">
      <div className="frame-parent">
        <div className="marks-list-parent">
          <div className="marks-list">
            <b className="b">
              Доставка, яка робить світ меншим, а вас ближчими.
            </b>
          </div>
          <h1 className="h11">Швидка доставка в будь-яку точку країни</h1>
        </div>
        <div className="frame-group">
          <button className="rectangle-parent">
            <div className="frame-child" />
            <b className="b1">Розпочати</b>
          </button>
          <button className="rectangle-group">
            <div className="frame-item" onClick={onRectangleClick} />
            <b className="b2">Дізнатись більше</b>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent;
