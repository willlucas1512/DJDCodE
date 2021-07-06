import React, { useState, useEffect, useContext } from "react";
import Level0 from "./Level0";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import LevelContext from "./LevelContext";

const Levels = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const { currentLevel, updateLevel } = useContext(LevelContext);
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
      {currentLevel === 0 && (
        <Level0 isMobile={isMobile} updateLevel={updateLevel} />
      )}
      {currentLevel === 1 && <Level1 isMobile={isMobile} />}
      {currentLevel === 2 && <Level2 isMobile={isMobile} />}
      {currentLevel === 3 && <Level3 isMobile={isMobile} />}
      {currentLevel === 4 && <Level4 isMobile={isMobile} />}
      {currentLevel === 5 && <Level5 isMobile={isMobile} />}
      {currentLevel === 6 && (
        <Level6 isMobile={isMobile} updateLevel={updateLevel} />
      )}
    </>
  );
};

export default Levels;
