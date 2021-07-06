import React, { useState, useEffect } from "react";
import Blockly from "blockly/core";
import { IconButton, Icon } from "@material-ui/core";

import Style from "./Restart.module.scss";

const Restart = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const resetWorkspace = () => {
    // const xLevel = props.currentLevel;
    // const xDePara = { 1: 0, 2: 3, 3: 6, 4: 9, 5: 12 };
    // const xLevelWorkspace = xDePara[xLevel];
    const xWorkspaces = Blockly.Workspace.getAll();
    xWorkspaces.map((pWorkspace) => {
      pWorkspace.clear();
    });
    props.maze.heroBackToStart();
  };

  useEffect(() => {
    IsMobile();
  }, []);

  return (
    <>
      {/* <Button
            variant={"contained"}
            size={"small"}
            color={isMobile ? "primary" : "secondary"}
            onClick={resetWorkspace}
          >
            Limpar
          </Button> */}
      <IconButton
        color={isMobile ? "primary" : "secondary"}
        onClick={resetWorkspace}
      >
        <Icon>replay</Icon>
      </IconButton>

      {/* <Button variant={"contained"} color={"primary"} onClick={generateCode}>
          {show ? "Esconder" : "Mostrar"} JavaScript
        </Button> */}
    </>
  );
};

export default Restart;
