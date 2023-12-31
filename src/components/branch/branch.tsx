import { useRef, useEffect, useState, useCallback, DragEvent } from "react";
import { Draggable } from "gsap/Draggable";
import { SNAP, GRID_SIZE, HEX_SIZE } from "../../constants";
import Head, { HEAD_SIZE } from "../head/head";
import { HeadLocationType } from "../../types";

const WIDTH = GRID_SIZE * 0.625; // 54px for a 80px grid size
const HEIGHT = GRID_SIZE * 1.25; // 100px for a 80px grid size

type BaseProps = {
  name: string;
  hue: number;
  isTracking?: boolean;
  isHead?: boolean;
};

type DroppableProps = BaseProps & {
  isDrop: true;
  branchId: number;
  handleHeadDrop: (type: HeadLocationType, id: number) => void;
};

type NonDroppableProps = BaseProps & {
  isDrop?: false;
  branchId?: undefined;
  handleHeadDrop?: undefined;
};

type Props = DroppableProps | NonDroppableProps;

const Branch = ({
  name,
  hue,
  isTracking,
  isDrop,
  branchId,
  handleHeadDrop,
  isHead,
}: Props) => {
  const dragInstance = useRef<Draggable[]>();
  const dragTarget = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  const rotate = useCallback(() => {
    setAngle((angle) => (angle - 45) % 360);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isDrop) {
        handleHeadDrop("branch", branchId);
      }
    },
    [isDrop, branchId, handleHeadDrop]
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
      dragInstance.current![0].kill();
      dragInstance.current = undefined;
    };
  }, [rotate]);

  return (
    <div
      className="absolute pointer-none"
      style={{
        // -WIDTH / 2 : offsetting the branch so it's centered on the grid
        // HEX_SIZE * 3 : offsetting so it sits after commits in the toolbox
        left: -WIDTH / 2 + HEX_SIZE * 3,
        top: `${GRID_SIZE - HEIGHT}px`,
        opacity: isTracking ? 0.5 : 1,
        height: `${HEIGHT}px`,
        width: `${WIDTH}px`,
      }}
      ref={dragTarget}
      onDragOver={isDrop ? handleDragOver : undefined}
      onDrop={isDrop ? handleDrop : undefined}
    >
      <div
        style={{
          height: `${HEIGHT}px`,
          transformOrigin: "bottom center",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <svg viewBox="0 0 50 100" width={WIDTH} height={HEIGHT}>
          <defs>
            <path d="M25, 0 V 100" id="b2te7nLyEm" />
            <rect
              id="rect1"
              ry="5"
              rx="5"
              y="10"
              x="1.5"
              height="35"
              width="47"
            />
          </defs>
          <g>
            <use
              xlinkHref="#b2te7nLyEm"
              opacity="1"
              fillOpacity="0"
              stroke={`hsl(${hue}, 50%, 50%)`}
              strokeOpacity="1"
              strokeWidth="3"
            />
            <use
              xlinkHref="#rect1"
              opacity="1"
              fill={`hsl(${hue}, 80%, 80%)`}
              fillOpacity="1"
            />
            <use
              xlinkHref="#rect1"
              stroke={`hsl(${hue}, 80%, 50%)`}
              opacity="1"
              fillOpacity="0"
              strokeOpacity="1"
              strokeWidth="3"
            />
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
        </svg>
        {isHead && (
          <Head
            className="absolute pointer-auto"
            data-clickable="true"
            style={{ top: -HEAD_SIZE * 0.6, left: (WIDTH - HEAD_SIZE) / 2 }}
          />
        )}
      </div>
    </div>
  );
};

export default Branch;
