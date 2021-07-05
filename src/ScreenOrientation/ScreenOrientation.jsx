import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import ThemeProvider from "../ThemeProvider";
import { themePrimary } from "../style/theme";
// import Maker from "./Maker";
import turningphone from "../turningphone.png";
import Levels from "../Levels/Levels";
import CodeProvider from "../Run/CodeProvider";
import LevelProvider from "../Levels/LevelProvider";

const ScreenOrientation = (props) => {
  const [orientation, setOrientation] = useState("portrait");
  const [isMobile, setIsMobile] = useState(true);

  const updateOrientation = () => {
    if (window.innerHeight < window.innerWidth && isMobile) {
      setOrientation("landscape");
    } else if (isMobile) {
      setOrientation("portrait");
    }
  };

  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    }
    if (window.innerHeight < window.innerWidth && isMobile) {
      setOrientation("landscape");
    }
    window.addEventListener("resize", updateOrientation);
  }, []);

  return orientation === "portrait" && isMobile ? (
    <div
      style={{
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={turningphone} />
        <p>Vire o celular para o modo paisagem :)</p>
      </div>
    </div>
  ) : (
    <ThemeProvider theme={themePrimary}>
      <LevelProvider>
        <CodeProvider>
          <Navbar />
          {/* <Maker /> */}
          <Levels />
        </CodeProvider>
      </LevelProvider>
    </ThemeProvider>
  );
};

export default ScreenOrientation;
