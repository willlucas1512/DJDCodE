import React, { useState, useEffect, useContext } from "react";
import Blockly from "blockly/core";
import { IconButton, Icon } from "@material-ui/core";
import NavbarContext from "../../../contexts/Navbar/NavbarContext";

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
      color={isMobile ? "primary" : "secondary"}
      onClick={resetWorkspace}
    >
      <Icon>replay</Icon>
    </IconButton>
  );
};

export default Restart;
