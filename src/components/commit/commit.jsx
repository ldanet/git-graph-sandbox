import React, { useRef, useEffect, useState, useCallback } from "react";
import { Draggable } from "gsap/Draggable";
import hash from "object-hash";
import { SNAP, GRID_SIZE } from "../../constants";
import Head, { HEAD_SIZE } from "../head/head";

const BORDER = GRID_SIZE / 20;
export const DIAMETER = GRID_SIZE / 2;

const Commit = ({
  handleDragEnd,
  handleHeadDrop,
  commitId,
  isRemote,
  isHead,
}) => {
  const dragInstance = useRef();
  const dragTarget = useRef();
  const shortID = useRef(hash(commitId).substring(0, 3));
  const [showID, setShowID] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      handleHeadDrop("commit", commitId);
    },
    [commitId, handleHeadDrop]
  );

  const toggleID = useCallback(() => {
    setShowID(!showID);
  }, [showID, setShowID]);

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, {
      type: "x,y",
      onClick: function () {
        toggleID();
      },
      onDragEnd: function () {
        handleDragEnd();
      },
      liveSnap: SNAP,
      dragClickables: false,
      zIndexBoost: false,
    });
    return () => {
      dragInstance.current[0].kill();
      dragInstance.current = undefined;
    };
  }, [toggleID, handleDragEnd]);

  const saturation = isRemote ? 0 : 90;

  return (
    <div
      ref={dragTarget}
      className="absolute"
      onDragOver={!isRemote ? handleDragOver : undefined}
      onDrop={!isRemote ? handleDrop : undefined}
    >
      <div
        // className="commit__body"
        style={{
          position: "absolute",
          height: DIAMETER,
          width: DIAMETER,
          borderRadius: DIAMETER / 2,
          border: `${BORDER}px solid hsl(39, ${saturation}%, 80%)`,
          backgroundColor: `hsl(39,  ${saturation}%, 69%)`,
          top: -DIAMETER / 2,
          left: -DIAMETER / 2 + (isRemote ? GRID_SIZE : 0),
          boxSizing: "border-box",
          fontSize: `${GRID_SIZE / 5}px`,
          lineHeight: `${GRID_SIZE / 2.5}px`,
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {showID && shortID.current}
      </div>
      {isHead && (
        <Head
          isDetached
          className="absolute"
          data-clickable="true"
          style={{ top: -HEAD_SIZE, left: (DIAMETER - HEAD_SIZE) / 2 }}
        />
      )}
    </div>
  );
};

export default Commit;
