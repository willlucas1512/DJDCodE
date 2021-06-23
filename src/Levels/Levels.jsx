import React, { useState, useEffect, useContext } from "react";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import LevelContext from "./LevelContext";

const Levels = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentLevel } = useContext(LevelContext);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    IsMobile();
  }, []);

  return (
    <>
      {currentLevel === 1 && <Level1 isMobile={isMobile} />}
      {currentLevel === 2 && <Level2 isMobile={isMobile} />}
      {currentLevel === 3 && <Level3 isMobile={isMobile} />}
    </>
  );
};

export default Levels;
