import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { classList } from "../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import { MobileStepper, Button } from "@material-ui/core";
import Logo from "../Logo";
import LevelContext from "../Levels/LevelContext";
import Style from "./Navbar.module.scss";

const Navbar = (props) => {
  const { currentLevel, updateLevel } = useContext(LevelContext);
  const [isMobile, setIsMobile] = useState(false);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "0px",
      backgroundColor: "transparent",
    },
    // dot: {
    //   backgroundColor: "#FFFFFF",
    // },
  }));

  const classes = useStyles();
  const xClassNames = {
    [classes.root]: true,
    // [classes.dot]: true,
  };

  const handleNext = () => {
    updateLevel((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    updateLevel((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    IsMobile();
  }, []);

  if (isMobile) {
    return (
      <div className={Style.mobile}>
        <div className={Style.menu}>
          <Menu />
        </div>
        <div className={Style.level}>
          <div className={Style.levelName}>
            <Typography color={"textPrimary"} variant={"h6"}>
              {currentLevel !== 0
                ? `Nível ${currentLevel}`
                : "O Labirinto dos Cogumelos"}
            </Typography>
          </div>
          <div className={Style.stepper}>
            <MobileStepper
              className={classList(xClassNames)}
              // style={{ backgroundColor: "white" }}
              variant="dots"
              steps={6}
              position="static"
              activeStep={currentLevel}
              nextButton={
                currentLevel !== 6 && (
                  <Button
                    size="small"
                    onClick={handleNext}
                    // disabled={currentLevel === 5}
                  >
                    Próximo
                  </Button>
                )
              }
              backButton={
                currentLevel !== 0 && (
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={currentLevel === 0}
                  >
                    Voltar
                  </Button>
                )
              }
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <div className={Style.marca}>
            <div className={Style.restNav}>
              <Logo />
              <div className={Style.navbarTitle}>
                <Typography variant="h6" className={Style.title}>
                  DJDCodE
                </Typography>
              </div>
            </div>
            <div className={Style.level}>
              <div className={Style.levelName}>
                <Typography variant={"h6"}>
                  {" "}
                  {currentLevel !== 0
                    ? `Nível ${currentLevel}`
                    : "O Labirinto dos Cogumelos"}
                </Typography>
              </div>
              <div className={Style.stepper}>
                <MobileStepper
                  className={classList(xClassNames)}
                  // style={{ backgroundColor: "white" }}
                  variant="dots"
                  steps={6}
                  position="static"
                  activeStep={currentLevel}
                  nextButton={
                    currentLevel !== 6 && (
                      <Button
                        size="small"
                        onClick={handleNext}
                        // disabled={currentLevel === 5}
                      >
                        Próximo
                      </Button>
                    )
                  }
                  backButton={
                    currentLevel !== 0 && (
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={currentLevel === 0}
                      >
                        Voltar
                      </Button>
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
};

export default Navbar;
