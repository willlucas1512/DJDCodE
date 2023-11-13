import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Avatar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { classList } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import {
  MobileStepper,
  Button,
  Icon,
  IconButton,
  Drawer,
} from "@material-ui/core";
import classNames from "classnames";
import SideMenu from "../SideMenu";
import Logo from "../Logo";
import LevelContext from "../../contexts/Level/LevelContext";
import CodeContext from "../../contexts/Code/CodeContext";
import NavbarContext from "../../contexts/Navbar/NavbarContext";
import Run from "../Run";
import Restart from "../Run/Restart";
import Style from "./Navbar.module.scss";
import CourseContext from "../../contexts/Course/CourseContext";

const Navbar = (props) => {
  const location = useLocation();
  const { currentLevel, updateLevel, updateHintLevel } =
    useContext(LevelContext);
  const [selectedCourse, setSelectedCourse] = useState(
    JSON.parse(localStorage.getItem("course"))
  );
  const { coursePlaying } = useContext(CourseContext);
  const { maze } = useContext(CodeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const { updatePage, page } = useContext(NavbarContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  }));

  const classes = useStyles();
  const xClassNames = {
    [classes.root]: true,
  };

  const handleNext = () => {
    updateLevel((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    updateLevel((prevActiveStep) => prevActiveStep - 1);
  };

  const handleHint = () => {
    updateHintLevel(currentLevel);
  };

  const Hint = () => {
    return (
      <IconButton
        // color={isMobile ? "primary" : "secondary"}
        onClick={handleHint}
      >
        {!isMobile && <Typography className={Style.label}>DICA</Typography>}
        <Icon>tips_and_updates</Icon>
      </IconButton>
    );
  };

  useEffect(() => {
    Object.keys(coursePlaying).length !== 0 && setSelectedCourse(coursePlaying);
  }, [coursePlaying]);

  useEffect(() => {
    IsMobile();
  }, []);

  const level0 = classNames(Style.level, {
    [Style.level0]: currentLevel === 0,
    [Style.level0Mobile]: currentLevel === 0 && isMobile,
    [Style.levelMobile]: isMobile,
  });

  return (
    <AppBar elevation={12} position="static">
      <Toolbar>
        <IconButton
          onClick={handleOpen}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <div className={Style.navPC}>
          <Link to={"/home"}>
            <div className={Style.restNav}>
              <Logo />
              <div className={Style.navbarTitle}>
                <Typography variant="h6" className={Style.title}>
                  DJDCodE
                </Typography>
              </div>
            </div>
          </Link>
          {location.pathname === "/cursoplayer" && (
            <div className={level0}>
              <div className={Style.subDivLevel}>
                <div className={Style.levelName}>
                  <Typography variant={"h6"}>
                    {" "}
                    {currentLevel !== 0
                      ? `Nível ${currentLevel}`
                      : selectedCourse?.nome}
                  </Typography>
                </div>
                <div className={Style.stepper}>
                  <MobileStepper
                    className={classList(xClassNames)}
                    // style={{ backgroundColor: "white" }}
                    variant="dots"
                    steps={selectedCourse?.qtd_niveis}
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
          )}
          {location.pathname === "/labirinto" && (
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
          )}
          {currentLevel !== 0 &&
            currentLevel !== 6 &&
            (location.pathname === "/cursoplayer" ||
              location.pathname === "/labirinto") && (
              <div className={Style.buttonsMobile}>
                <Hint />
                <Restart maze={maze} />
                <div className={Style.run}>
                  <Run />
                </div>
              </div>
            )}
        </div>
        {localStorage.getItem("user") ? (
          <Link to="/perfil">
            <div className={Style.username}>
              <Avatar />
              <div className={Style.horizontalSpacer}></div>
              <div className={Style.horizontalSpacer}></div>
              <div className={Style.horizontalSpacer}></div>
              <Typography variant={"body1"}>
                <b>
                  {JSON.parse(localStorage.getItem("user"))
                    .name_first.charAt(0)
                    .toUpperCase() +
                    JSON.parse(localStorage.getItem("user")).name_first.slice(
                      1
                    )}{" "}
                </b>
              </Typography>
              <div className={Style.horizontalSpacer}></div>
              <Typography variant={"body1"}>
                {" "}
                <b>
                  {" "}
                  {JSON.parse(localStorage.getItem("user"))
                    .name_last.charAt(0)
                    .toUpperCase() +
                    JSON.parse(localStorage.getItem("user")).name_last.slice(1)}
                </b>
              </Typography>
              <div className={Style.horizontalSpacer}></div>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
      <Drawer anchor={"left"} open={open} onClose={handleClose}>
        <div className={Style.sideMenu}>
          <SideMenu handleClick={updatePage} />
        </div>
      </Drawer>
    </AppBar>
  );
  // }
};

export default Navbar;
