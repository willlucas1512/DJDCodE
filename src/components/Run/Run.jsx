import React, { useState, useEffect, useContext } from "react";
import Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import { IconButton, Icon, Typography } from "@material-ui/core";
import CodeContext from "../../contexts/Code/CodeContext";
import PropTypes from "prop-types";
import Style from "./Run.module.scss";

const Run = (props) => {
  const { updateCode, providerWorkspace, updateWalk } = useContext(CodeContext);
  const [workspace, setWorkspace] = useState({});
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // const generateCode = () => {
  //   var code = BlocklyJS.workspaceToCode(workspace.workspace);
  //   updateCode(code);
  //   setShow(!show);
  // };

  // const deepCopy = (pSource) => {
  //   return JSON.parse(JSON.stringify(pSource));
  // };

  const runCode = () => {
    updateWalk();
    window.LoopTrap = 1000;
    BlocklyJS.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    // const code = BlocklyJS.workspaceToCode(workspace.workspace);
    const xWorkspace = Blockly.Workspace.getAll()[0];
    const code = BlocklyJS.workspaceToCode(xWorkspace.workspace);
    // const xBlocksOnWorkspace = xWorkspace.getAllBlocks();
    updateCode(code);
    BlocklyJS.INFINITE_LOOP_TRAP = null;
    try {
      // eslint-disable-next-line
      // eval(code);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    setWorkspace(providerWorkspace);
  }, [providerWorkspace]);

  useEffect(() => {
    IsMobile();
  }, []);

  return (
    <>
      <IconButton
        // color={isMobile ? "primary" : "secondary"}
        onClick={runCode}
      >
        {!isMobile && <Typography className={Style.label}>RODAR</Typography>}
        <Icon>play_arrow</Icon>
      </IconButton>
    </>
  );
};

Run.propTypes = {
  workspace: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default Run;
