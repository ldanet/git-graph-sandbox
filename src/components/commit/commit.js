import React, { useRef, useEffect, useState, useCallback } from "react";
import { Draggable } from "gsap/all";
import hash from "object-hash";
import { SNAP, GRID_SIZE } from "../../constants";
import Head from "../head/head";

const Commit = ({
  handleDragEnd,
  handleHeadDrop,
  commitId,
  isRemote,
  isHead
}) => {
  const dragInstance = useRef();
  const dragTarget = useRef();
  const shortID = useRef(hash(commitId).substring(0, 3));
  const [showID, setShowID] = useState(false);

  const handleDragOver = useCallback(e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    e => {
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
      onClick: function() {
        toggleID();
      },
      onDragEnd: function() {
        handleDragEnd();
      },
      liveSnap: SNAP,
      dragClickables: false,
      zIndexBoost: false
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
          height: 40,
          width: 40,
          borderRadius: 20,
          border: `4px solid hsl(39, ${saturation}%, 80%)`,
          backgroundColor: `hsl(39,  ${saturation}%, 69%)`,
          top: -20,
          left: -20 + (isRemote ? GRID_SIZE : 0),
          boxSizing: "border-box",
          lineHeight: "32px",
          overflow: "hidden",
          textAlign: "center"
        }}
      >
        {showID && shortID.current}
      </div>
      {isHead && (
        <Head
          isDetached
          className="absolute"
          data-clickable="true"
          style={{ top: -20, left: 12 }}
        />
      )}
    </div>
  );
};

export default Commit;
