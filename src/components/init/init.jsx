import React, { useRef, useEffect } from "react";
import { Draggable } from "gsap/Draggable";
import { SNAP, GRID_SIZE } from "../../constants";

const Init = () => {
  const dragInstance = useRef();
  const dragTarget = useRef();

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "x,y",
      liveSnap: SNAP,
      dragClickables: false,
      zIndexBoost: false,
    });
    return () => {
      dragInstance.current[0].kill();
      dragInstance.current = undefined;
    };
  }, []);

  return (
    <div ref={dragTarget} className="absolute">
      <div
        // className="commit__body"
        style={{
          position: "absolute",
          height: 40,
          width: 80,
          borderRadius: 80,
          border: `4px dashed hsl(39, 0%, 80%)`,
          backgroundColor: `white`,
          top: -20 + GRID_SIZE * 2,
          left: -40,
          boxSizing: "border-box",
          lineHeight: "32px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        init
      </div>
    </div>
  );
};

export default Init;
