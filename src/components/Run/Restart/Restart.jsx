import React, { useState, useEffect, useContext } from "react";
import Blockly from "blockly/core";
import { IconButton, Icon, Typography, makeStyles } from "@material-ui/core";
import NavbarContext from "../../../contexts/Navbar/NavbarContext";
import Style from "./Restart.module.scss";

const Restart = (props) => {
  const { updateResetLevel } = useContext(NavbarContext);
  const [isMobile, setIsMobile] = useState(false);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const resetWorkspace = () => {
    const xWorkspaces = Blockly.Workspace.getAll();
    xWorkspaces.map((pWorkspace) => {
      pWorkspace.clear();
    });
    props.maze.heroBackToStart();
    updateResetLevel();
  };

  const useStyles = makeStyles({
    root: {
      backgroundColor: "#5368a6",
      borderRadius: isMobile ? "50%" : "10px",
      marginRight: "10px",
    },
  });

  const classes = useStyles();

  useEffect(() => {
    IsMobile();
  }, []);

  return (
    <IconButton classes={{ root: classes.root }} onClick={resetWorkspace}>
      {!isMobile && <Typography className={Style.label}>RECOMEÇAR</Typography>}
      <Icon>replay</Icon>
    </IconButton>
  );
};

export default Restart;
