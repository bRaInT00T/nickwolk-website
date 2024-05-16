import React from "react";
import "../css/outlineButton.css";

const OutlineButton = () => {
  return (
    <div className="outlineButton">
      <DrawOutlineButton>Hover me</DrawOutlineButton>
    </div>
  );
};

const DrawOutlineButton = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="button"
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="background" />

      {/* RIGHT */}
      <span className="right" />

      {/* BOTTOM */}
      <span className="bottom" />

      {/* LEFT */}
      <span className="left" />
    </button>
  );
};

export default OutlineButton;