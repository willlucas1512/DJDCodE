import React, { memo, useState } from "react";
import LevelContext from "./LevelContext";

const LevelProvider = memo((props) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showHintLevel, setShowHintLevel] = useState(0);

  const state = {
    ...props.state,
    currentLevel,
    showHintLevel,
  };

  const updateLevel = (pLevel) => {
    setCurrentLevel(pLevel);
  };

  const updateHintLevel = (pLevel) => {
    setShowHintLevel(pLevel);
  };

  const actions = { updateLevel, updateHintLevel };

  return (
    <LevelContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </LevelContext.Provider>
  );
});

export default LevelProvider;
