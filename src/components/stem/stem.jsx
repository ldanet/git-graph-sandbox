import React, { useRef, useEffect, useState, useCallback } from "react";
import { Draggable } from "gsap/Draggable";
import { GRID_SIZE, SNAP } from "../../constants";

const VARIANTS = [
  `M0,0 L0,${GRID_SIZE}`,
  `M0,0L${GRID_SIZE},${GRID_SIZE}`,
  `M${GRID_SIZE},0L0,${GRID_SIZE}`,
];

const STEM_THICKNESS = GRID_SIZE * 0.05;

const Stem = ({ handleDragEnd }) => {
  const dragInstance = useRef();
  const dragTarget = useRef();
  const [variant, setVariant] = useState(0);

  const rotate = useCallback(() => {
    setVariant((variant + 1) % VARIANTS.length);
  }, [variant, setVariant]);

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "x,y",
      onClick: function () {
        rotate();
      },
      onDragEnd: function () {
        handleDragEnd();
      },
      liveSnap: SNAP,
      dragClickables: true,
      zIndexBoost: false,
    });
    return () => {
      dragInstance.current[0].kill();
      dragInstance.current = undefined;
    };
  }, [rotate, handleDragEnd]);

  return (
    <svg
      style={{ left: `-${STEM_THICKNESS / 2}px` }}
      className="absolute"
      ref={dragTarget}
      viewBox={`-${STEM_THICKNESS / 2} 0 ${GRID_SIZE} ${GRID_SIZE}`}
      width={GRID_SIZE}
      height={GRID_SIZE}
    >
      <path
        d={VARIANTS[variant]}
        opacity="1"
        fillOpacity="0"
        stroke="#000000"
        strokeWidth={STEM_THICKNESS}
        strokeOpacity="1"
      />
    </svg>
  );
};

export default Stem;
