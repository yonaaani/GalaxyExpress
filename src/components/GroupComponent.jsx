import { useMemo } from "react";
import "./GroupComponent.css";

const GroupComponent = ({
  prop,
  prop1,
  image38,
  propPadding,
  propGap,
  propWidth,
  propHeight,
}) => {
  const groupDiv1Style = useMemo(() => {
    return {
      padding: propPadding,
      gap: propGap,
    };
  }, [propPadding, propGap]);

  const image38IconStyle = useMemo(() => {
    return {
      width: propWidth,
      height: propHeight,
    };
  }, [propWidth, propHeight]);

  return (
    <div className="rectangle-parent1" style={groupDiv1Style}>
      <div className="frame-child2" />
      <div className="parent">
        <h2 className="h21">{prop}</h2>
        <h3 className="h31">{prop1}</h3>
      </div>
      <img
        className="image-38-icon1"
        loading="eager"
        alt=""
        src={image38}
        style={image38IconStyle}
      />
    </div>
  );
};

export default GroupComponent;
