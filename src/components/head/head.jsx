import React from "react";
const Head = ({ isDetached, ...props }) => {
  return (
    <img
      draggable
      className="head"
      src={
        isDetached
          ? "https://upload.wikimedia.org/wikipedia/commons/e/e0/Emblem-ohno.svg"
          : "https://upload.wikimedia.org/wikipedia/commons/a/a7/Emblem-fun.svg"
      }
      alt=""
      width={30}
      height={30}
      {...props}
    />
  );
};

export default Head;
