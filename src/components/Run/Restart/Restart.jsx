import React, { useState, useEffect, useContext } from "react";
import Blockly from "blockly/core";
import { IconButton, Icon, Typography } from "@material-ui/core";
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

  useEffect(() => {
    IsMobile();
  }, []);

  return (
    <IconButton
      // color={isMobile ? "primary" : "secondary"}
      onClick={resetWorkspace}
    >
      {!isMobile && <Typography className={Style.label}>RECOMEÇAR</Typography>}
      <Icon>replay</Icon>
    </IconButton>
  );
};

export default Restart;
