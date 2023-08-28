import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "../ThemeProvider";
import { themePrimary } from "../../style/theme";
import { Typography } from "@material-ui/core";
import turningphone from "./turningphone.png";
import SwitchPages from "../SwitchPages";
import CodeProvider from "../../contexts/Code/CodeProvider";
import LevelProvider from "../../contexts/Level/LevelProvider";
import NavbarProvider from "../../contexts/Navbar/NavbarProvider";
import Routes from "../Routes/Routes";
import CourseProvider from "../../contexts/Course/CourseProvider";

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
    if (window.innerWidth < 920) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    if (window.innerHeight < window.innerWidth && isMobile) {
      setOrientation("landscape");
    }
    window.addEventListener("resize", updateOrientation);
  }, []);

  return orientation === "portrait" && isMobile ? (
    <div
      style={{
        backgroundColor: "#F5F5F5",
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
        <img height="100px" width="100px" src={turningphone} />

        <div
          style={{
            marginTop: "32px",
            width: "250px",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
            }}
          >
            <Typography variant={"h6"} align={"center"}>
              <b> Pera aí, não precisa alongar o pescoço! </b>
            </Typography>
          </div>
          <Typography variant={"body1"} align={"center"}>
            Pode virar a tela sem medo para o modo paisagem.
          </Typography>
        </div>
      </div>
    </div>
  ) : (
    <BrowserRouter>
      <ThemeProvider theme={themePrimary}>
        <NavbarProvider>
          <LevelProvider>
            <CodeProvider>
              <CourseProvider>
                <SwitchPages />
                <Routes />
              </CourseProvider>
            </CodeProvider>
          </LevelProvider>
        </NavbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default ScreenOrientation;
