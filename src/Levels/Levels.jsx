import React, { useState, useEffect } from "react";
import Level1 from "./Level1";

const Levels = (props) => {
  const [isMobile, setIsMobile] = useState(false);
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

  return <Level1 isMobile={isMobile} />;
};

export default Levels;
