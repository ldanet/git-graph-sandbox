import { useRef, useEffect } from "react";
import { Draggable } from "gsap/Draggable";
import { SNAP, GRID_SIZE } from "../../constants";

const Init = () => {
  const dragInstance = useRef<Draggable[]>();
  const dragTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "x,y",
      liveSnap: SNAP,
      dragClickables: false,
      zIndexBoost: false,
    });
    return () => {
      dragInstance.current![0].kill();
      dragInstance.current = undefined;
    };
  }, []);

  return (
    <div ref={dragTarget} className="absolute">
      <div
        // className="commit__body"
        style={{
          position: "absolute",
          height: GRID_SIZE / 2,
          width: GRID_SIZE,
          borderRadius: GRID_SIZE,
          border: `${GRID_SIZE * 0.05}px dashed hsl(39, 0%, 80%)`,
          backgroundColor: `white`,
          top: -GRID_SIZE / 4 + GRID_SIZE * 2,
          left: -GRID_SIZE / 2,
          boxSizing: "border-box",
          lineHeight: `${GRID_SIZE * 0.4}px`,
          fontSize: `${GRID_SIZE / 5}px`,
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
