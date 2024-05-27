import { useMemo } from "react";
import "./GroupComponent1.css";

const GroupComponent1 = ({
  prop,
  prop1,
  image38,
  ellipse,
  propPadding,
  propWidth,
  propLeft,
  propRight,
}) => {
  const groupDivStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const textStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const ellipseIconStyle = useMemo(() => {
    return {
      left: propLeft,
      right: propRight,
    };
  }, [propLeft, propRight]);

  return (
    <div className="group-div" style={groupDivStyle}>
      <div className="frame-child1" />
      <div className="rectangle-frame">
        <div className="image">
          <h2 className="h2">{prop}</h2>
          <h3 className="h3">{prop1}</h3>
        </div>
      </div>
      <div className="text-wrapper">
        <div className="text" style={textStyle}>
          <img className="image-38-icon" loading="eager" alt="" src={image38} />
         
        </div>
      </div>
    </div>
  );
};

export default GroupComponent1;
