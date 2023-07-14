import React, { useRef, useEffect, useState, useCallback } from "react";
import { Draggable } from "gsap/Draggable";
import { SNAP, GRID_SIZE } from "../../constants";
import Head from "../head/head";

const Branch = ({
  name,
  hue,
  isRemote,
  isDrop,
  branchId,
  isHead,
  handleHeadDrop,
}) => {
  const dragInstance = useRef();
  const dragTarget = useRef();
  const [angle, setAngle] = useState(0);

  const rotate = useCallback(() => {
    setAngle((angle - 45) % 360);
  }, [angle, setAngle]);

  const id = `branch${branchId}`;

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      handleHeadDrop("branch", branchId);
    },
    [branchId, handleHeadDrop]
  );

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "x,y",
      onClick: function () {
        rotate();
      },
      liveSnap: SNAP,
      dragClickables: false,
      zIndexBoost: false,
    });
    return () => {
      dragInstance.current[0].kill();
      dragInstance.current = undefined;
    };
  }, [rotate, id]);

  return (
    <div
      className="absolute pointer-none"
      style={{
        left: 53 + GRID_SIZE, // 55 - 2
        top: `${GRID_SIZE - 100}px`,
        opacity: isRemote ? 0.5 : 1,
      }}
      ref={dragTarget}
      onDragOver={isDrop ? handleDragOver : undefined}
      onDrop={isDrop ? handleDrop : undefined}
    >
      <div
        style={{
          transformOrigin: "bottom center",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <svg viewBox={`-2 0 54 100`} width={54} height={100}>
          <defs>
            <path d="M25 100L25 0" id="b2te7nLyEm" />
            <path
              d="M45.35 10C47.92 10 50 12.08 50 14.65C50 20.72 50 34.28 50 40.35C50 42.92 47.92 45 45.35 45C36.28 45 13.72 45 4.65 45C2.08 45 0 42.92 0 40.35C0 34.28 0 20.72 0 14.65C0 12.08 2.08 10 4.65 10C13.72 10 36.28 10 45.35 10Z"
              id="b1RpRAOnUA"
            />
          </defs>
          <g>
            <g>
              <g>
                <g>
                  <use
                    xlinkHref="#b2te7nLyEm"
                    opacity="1"
                    fillOpacity="0"
                    stroke={`hsl(${hue}, 50%, 50%)`}
                    strokeOpacity="1"
                    strokeWidth="3"
                  />
                </g>
              </g>
              <g>
                <use
                  xlinkHref="#b1RpRAOnUA"
                  opacity="1"
                  fill={`hsl(${hue}, 80%, 80%)`}
                  fillOpacity="1"
                />
                <g>
                  <use
                    xlinkHref="#b1RpRAOnUA"
                    stroke={`hsl(${hue}, 80%, 50%)`}
                    opacity="1"
                    fillOpacity="0"
                    strokeOpacity="1"
                    strokeWidth="3"
                  />
                </g>
              </g>
              <g id="g1zjG7nLtD">
                <text
                  id="agidSfaf9"
                  x="0"
                  y="0"
                  opacity="1"
                  fill="#000"
                  fillOpacity="1"
                  fontSize="12"
                >
                  <tspan textAnchor="middle" x="25" dy="32">
                    {name}
                  </tspan>
                </text>
              </g>
            </g>
          </g>
        </svg>
        {isHead && (
          <Head
            className="absolute pointer-auto"
            data-clickable="true"
            style={{ top: -20, left: 12 }}
          />
        )}
      </div>
    </div>
  );
};

export default Branch;
