import React from "react";
import { useStateContext } from "../context/StateContext";

const Star = ({ num }: { num: any }) => {
  const { width, setWidth } = useStateContext();

  return (
    <div
      className="ratings"
      onClick={(e) => {
        let deltaX = e.nativeEvent.offsetX;
        setWidth(Math.ceil(deltaX / 20) * 20);
      }}
    >
      <div className="empty-stars"></div>
      <div
        className="full-stars"
        style={
          num === undefined
            ? { width: width + "%" }
            : { width: (num / 5) * 100 + "%" }
        }
      ></div>
    </div>
  );
};

export default Star;
