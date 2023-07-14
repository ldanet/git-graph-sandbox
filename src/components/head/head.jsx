import React from "react";
import { GRID_SIZE } from "../../constants";

export const HEAD_SIZE = GRID_SIZE * 0.375;

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
      width={HEAD_SIZE}
      height={HEAD_SIZE}
      {...props}
    />
  );
};

export default Head;
