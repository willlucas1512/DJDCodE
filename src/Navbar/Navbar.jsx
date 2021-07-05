import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { classList } from "../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import { MobileStepper, Button } from "@material-ui/core";
import classNames from "classnames";
import Logo from "../Logo";
import LevelContext from "../Levels/LevelContext";
import Run from "../Run";
import Restart from "../Run/Restart";
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

  const level0 = classNames(Style.level, {
    [Style.level0]: currentLevel === 0,
    [Style.level0Mobile]: currentLevel === 0 && isMobile,
    [Style.levelMobile]: isMobile,
  });

  const subDivLevel = classNames(Style.subDivLevel, {
    [Style.subDivLevelMobile]: isMobile,
  });

  if (isMobile) {
    return (
      <div className={Style.mobile}>
        <div className={Style.menu}>
          <Menu />
        </div>
        <div className={level0}>
          <div className={subDivLevel}>
            <div className={Style.levelName}>
              <Typography color={"textPrimary"} variant={"h6"}>
                {currentLevel !== 0 ? `Nível ${currentLevel}` : "O Labirinto"}
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
        {currentLevel !== 0 && (
          <div className={Style.buttons}>
            <Restart currentLevel={currentLevel} />
            <div className={Style.run}>
              <Run />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <div className={Style.navPC}>
            <div className={Style.restNav}>
              <Logo />
              <div className={Style.navbarTitle}>
                <Typography variant="h6" className={Style.title}>
                  DJDCodE
                </Typography>
              </div>
            </div>
            <div className={level0}>
              <div className={Style.subDivLevel}>
                <div className={Style.levelName}>
                  <Typography variant={"h6"}>
                    {" "}
                    {currentLevel !== 0
                      ? `Nível ${currentLevel}`
                      : "O Labirinto"}
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
                          // color={"textPrimary"}
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
            {currentLevel !== 0 && (
              <div className={Style.buttonsMobile}>
                <Restart />
                <div className={Style.run}>
                  <Run />
                </div>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
};

export default Navbar;
