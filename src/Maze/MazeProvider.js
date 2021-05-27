import React, { memo, useState } from "react";
import MazeContext from "./MazeContext";

const MazeProvider = memo((props) => {
  const [heroPos, setHeroPos] = useState({});

  const state = {
    ...props.state,
    heroPos,
  };

  const updateHeroPos = (pos) => {
    setHeroPos(pos);
  };
  const actions = { updateHeroPos };

  return (
    <MazeContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </MazeContext.Provider>
  );
});

export default MazeProvider;
