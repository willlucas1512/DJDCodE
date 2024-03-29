import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
import LevelContext from "../../views/Cursos/Labirinto/Levels/LevelContext";
import CodeContext from "../Run/CodeContext";
import NavbarContext from "./NavbarContext";
import Run from "../Run";
import Restart from "../Run/Restart";
import Style from "./Navbar.module.scss";

const Navbar = (props) => {
  const { currentLevel, updateLevel, updateHintLevel } =
    useContext(LevelContext);
  const { maze } = useContext(CodeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const { updatePage, page, course } = useContext(NavbarContext);
  const name_first = useSelector((state) => state.user.user.name_first);
  const name_last = useSelector((state) => state.user.user.name_last);
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

  const handleHint = () => {
    updateHintLevel(currentLevel);
  };

  const Hint = () => {
    return (
      <IconButton
        color={isMobile ? "primary" : "secondary"}
        onClick={handleHint}
      >
        <Icon>tips_and_updates</Icon>
      </IconButton>
    );
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

  // if (isMobile) {
  //   return (
  //     <div className={Style.mobile}>
  //       <div className={Style.menu}>
  //         <IconButton
  //           onClick={handleOpen}
  //           edge="start"
  //           color="inherit"
  //           aria-label="menu"
  //         >
  //           <MenuIcon />
  //         </IconButton>
  //       </div>
  //       {course === "Labirinto" && (
  //         <div className={level0}>
  //           <div className={subDivLevel}>
  //             <div className={Style.levelName}>
  //               <Typography color={"textPrimary"} variant={"h6"}>
  //                 {currentLevel !== 0 ? `Nível ${currentLevel}` : "O Labirinto"}
  //               </Typography>
  //             </div>
  //             <div className={Style.stepper}>
  //               <MobileStepper
  //                 className={classList(xClassNames)}
  //                 // style={{ backgroundColor: "white" }}
  //                 variant="dots"
  //                 steps={6}
  //                 position="static"
  //                 activeStep={currentLevel}
  //                 nextButton={
  //                   currentLevel !== 6 && (
  //                     <Button
  //                       size="small"
  //                       onClick={handleNext}
  //                       // disabled={currentLevel === 5}
  //                     >
  //                       Próximo
  //                     </Button>
  //                   )
  //                 }
  //                 backButton={
  //                   currentLevel !== 0 && (
  //                     <Button
  //                       size="small"
  //                       onClick={handleBack}
  //                       disabled={currentLevel === 0}
  //                     >
  //                       Voltar
  //                     </Button>
  //                   )
  //                 }
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //       {currentLevel !== 0 && (
  //         <div className={Style.buttons}>
  //           <Hint />
  //           <Restart maze={maze} />
  //           <div className={Style.run}>
  //             <Run />
  //           </div>
  //         </div>
  //       )}
  //       {page === "Home" && (
  //         <Button
  //           color="inherit"
  //           // onClick={handleOpen}
  //         >
  //           Login
  //         </Button>
  //       )}
  //       <Drawer anchor={"left"} open={open} onClose={handleClose}>
  //         <div className={Style.sideMenu}>
  //           <SideMenu handleClick={updatePage} />
  //         </div>
  //       </Drawer>
  //     </div>
  //   );
  // } else {
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
          <div className={Style.restNav}>
            <Logo />
            <div className={Style.navbarTitle}>
              <Typography variant="h6" className={Style.title}>
                DJDCodE
              </Typography>
            </div>
          </div>
          {course === "labirinto" && (
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
          {currentLevel !== 0 && course === "labirinto" && currentLevel !== 6 && (
            <div className={Style.buttonsMobile}>
              <Hint />
              <Restart maze={maze} />
              <div className={Style.run}>
                <Run />
              </div>
            </div>
          )}
        </div>
        {page === "Home" && !name_first && (
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
        )}
        {name_first && name_last && (
          <div className={Style.username}>
            <Avatar />
            <div className={Style.horizontalSpacer}></div>
            <div className={Style.horizontalSpacer}></div>
            <div className={Style.horizontalSpacer}></div>
            <Typography variant={"body1"}>
              <b>{name_first.charAt(0).toUpperCase() + name_first.slice(1)} </b>
            </Typography>
            <div className={Style.horizontalSpacer}></div>
            <Typography variant={"body1"}>
              {" "}
              <b> {name_last.charAt(0).toUpperCase() + name_last.slice(1)}</b>
            </Typography>
            <div className={Style.horizontalSpacer}></div>
          </div>
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
