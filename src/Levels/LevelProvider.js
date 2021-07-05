import React, { memo, useState } from "react";
import LevelContext from "./LevelContext";

const LevelProvider = memo((props) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const state = {
    ...props.state,
    currentLevel,
  };

  const updateLevel = (pLevel) => {
    setCurrentLevel(pLevel);
  };

  const actions = { updateLevel };

  return (
    <LevelContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </LevelContext.Provider>
  );
});

export default LevelProvider;
