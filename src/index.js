import React, { useState, useCallback, useRef, Fragment } from "react";
import { render } from "react-dom";

import "./styles.css";
import Commit from "./components/commit/commit";
import Stem from "./components/stem/stem";
import Branch from "./components/branch/branch";
import Init from "./components/init/init";

const App = () => {
  const inputRef = useRef();
  const [commits, setCommits] = useState([{ id: 0 }]);
  const [remoteCommits, setRemoteCommits] = useState([{ id: 0 }]);
  const [stems, setStems] = useState([{ id: 0 }]);
  const [branches, setBranches] = useState([{ id: 0, name: "main", hue: -10 }]);
  const [remoteBranches, setRemoteBranches] = useState([]);
  const [originBranches, setOriginBranches] = useState([]);
  const [headLocation, setHeadLocation] = useState({ type: "branch", id: 0 });
  const [inits, setInits] = useState([]);

  const handleHeadDrop = useCallback((type, id) => {
    setHeadLocation({ type, id });
  }, []);

  const handleAddInit = useCallback(
    (id) => {
      setInits([...inits, { id: inits.length }]);
    },
    [inits, setInits]
  );
  const handleAddCommit = useCallback(
    (id) => {
      if (id === commits.length - 1) {
        setCommits([...commits, { id: commits.length }]);
      }
    },
    [commits, setCommits]
  );
  const handleAddRemoteCommit = useCallback(
    (id) => {
      if (id === remoteCommits.length - 1) {
        setRemoteCommits([...remoteCommits, { id: remoteCommits.length }]);
      }
    },
    [remoteCommits, setRemoteCommits]
  );
  const handleAddStem = useCallback(
    (id) => {
      if (id === stems.length - 1) {
        setStems([...stems, { id: stems.length }]);
      }
    },
    [stems, setStems]
  );
  const handleAddBranch = useCallback(() => {
    setBranches([
      ...branches,
      {
        id: branches.length,
        name: inputRef.current.value,
        hue: branches.length * 222 - 10
      }
    ]);
  }, [branches, setBranches]);
  const handleAddRemoteBranch = useCallback(() => {
    setRemoteBranches([
      ...remoteBranches,
      {
        id: remoteBranches.length,
        name: inputRef.current.value,
        hue: remoteBranches.length * 222 - 10
      }
    ]);
  }, [remoteBranches, setRemoteBranches]);
  const handleAddOriginBranch = useCallback(() => {
    setOriginBranches([
      ...originBranches,
      {
        id: originBranches.length,
        name: inputRef.current.value,
        hue: originBranches.length * 222 - 10
      }
    ]);
  }, [originBranches, setOriginBranches]);

  const hasRepo = !!inits.length;
  const hasRemote = inits.length > 1;

  return (
    <div>
      <h1>Git repo model</h1>
      {!hasRemote && (
        <Fragment>
          <button onClick={handleAddInit}>Init{hasRepo && " remote"}</button>
          <br />
        </Fragment>
      )}
      {hasRepo && (
        <Fragment>
          <label htmlFor="branch-name">Branch name</label>
          <br />
          <input id="branch-name" ref={inputRef} type="text" />

          <button onClick={handleAddBranch}>Add branch</button>
          {hasRemote && (
            <Fragment>
              <button onClick={handleAddRemoteBranch}>Add remote branch</button>
              <button onClick={handleAddOriginBranch}>Add origin branch</button>
            </Fragment>
          )}
          <div className="toolbox">
            {stems.map((stem) => (
              <Stem
                key={`s${stem.id}`}
                handleDragEnd={handleAddStem.bind(null, stem.id)}
              />
            ))}
            {originBranches.map((branch) => (
              <Branch
                key={`br${branch.id}`}
                name={branch.name}
                hue={branch.hue}
                isOrigin
              />
            ))}
            {remoteBranches.map((branch) => (
              <Branch
                key={`br${branch.id}`}
                name={branch.name}
                hue={branch.hue}
                isRemote
              />
            ))}
            {inits.length &&
              branches.map((branch) => (
                <Branch
                  key={`b${branch.id}`}
                  branchId={branch.id}
                  name={branch.name}
                  hue={branch.hue}
                  isHead={
                    headLocation.type === "branch" &&
                    headLocation.id === branch.id
                  }
                  handleHeadDrop={handleHeadDrop}
                  isDrop
                />
              ))}
            {inits.length > 1 &&
              remoteCommits.map((remoteCommit) => (
                <Commit
                  key={`c${remoteCommit.id}`}
                  commitId={remoteCommit.id}
                  handleDragEnd={handleAddRemoteCommit.bind(
                    null,
                    remoteCommit.id
                  )}
                  isRemote
                />
              ))}
            {commits.map((commit) => (
              <Commit
                key={`c${commit.id}`}
                commitId={commit.id}
                handleDragEnd={handleAddCommit.bind(null, commit.id)}
                isHead={
                  headLocation.type === "commit" &&
                  headLocation.id === commit.id
                }
                handleHeadDrop={handleHeadDrop}
              />
            ))}
            {inits.map((init) => (
              <Init key={`i${init.id}`} />
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
