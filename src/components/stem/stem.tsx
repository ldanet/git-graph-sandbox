import { useRef, useEffect, useState, useCallback } from "react";
import { Draggable } from "gsap/Draggable";
import { GRID_SIZE, SNAP } from "../../constants";

const ANGLES = [0, 60, 0, -60];

const STEM_THICKNESS = GRID_SIZE * 0.05;

type Props = {
  handleDragEnd: () => void;
};

const Stem = ({ handleDragEnd }: Props) => {
  const dragInstance = useRef<Draggable[]>();
  const dragTarget = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState(0);

  const rotate = useCallback(() => {
    setVariant((variant) => (variant + 1) % ANGLES.length);
  }, []);

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "x,y",
      onDragEnd: function () {
        handleDragEnd();
      },
      liveSnap: SNAP,
      dragClickables: true,
      zIndexBoost: false,
    });
    return () => {
      dragInstance.current![0].kill();
      dragInstance.current = undefined;
    };
  }, [rotate, handleDragEnd]);

  return (
    <div
      className="absolute"
      ref={dragTarget}
      style={{
        left: `-${STEM_THICKNESS / 2}px`,
      }}
      onClick={rotate}
    >
      <div
        style={{
          transformOrigin: "bottom left",
          transform: `rotate(${ANGLES[variant]}deg)`,
          height: `${GRID_SIZE}px`,
        }}
      >
        <svg
          viewBox={`-${STEM_THICKNESS / 2} 0 ${GRID_SIZE} ${GRID_SIZE}`}
          width={GRID_SIZE}
          height={GRID_SIZE}
        >
          <path
            d={`M0,0 L0,${GRID_SIZE}`}
            opacity="1"
            fillOpacity="0"
            stroke="#000000"
            strokeWidth={STEM_THICKNESS}
            strokeOpacity="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default Stem;
