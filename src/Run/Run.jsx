import React, { useRef, useState, useEffect, useContext } from "react";
import Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import { Button } from "@material-ui/core";
import CodeContext from "./CodeContext";
import PropTypes from "prop-types";
import Style from "./Run.module.scss";

const Run = (props) => {
  const { updateCode, providerWorkspace, updateWalk } = useContext(CodeContext);
  const [workspace, setWorkspace] = useState({});
  const [show, setShow] = useState(false);

  const generateCode = () => {
    var code = BlocklyJS.workspaceToCode(workspace.workspace);
    updateCode(code);
    setShow(!show);
  };

  // const deepCopy = (pSource) => {
  //   return JSON.parse(JSON.stringify(pSource));
  // };

  const runCode = () => {
    updateWalk();
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    BlocklyJS.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';
    // const code = BlocklyJS.workspaceToCode(workspace.workspace);
    const xWorkspace = Blockly.Workspace.getAll()[0];
    const code = BlocklyJS.workspaceToCode(xWorkspace.workspace);
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks();
    xBlocksOnWorkspace.map((bloco, index) => {});
    updateCode(code);
    BlocklyJS.INFINITE_LOOP_TRAP = null;
    try {
      // eslint-disable-next-line
      eval(code);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    setWorkspace(providerWorkspace);
  }, [providerWorkspace]);

  return (
    <>
      <div className={Style.buttons}>
        <div className={Style.button}>
          <Button
            variant={"contained"}
            size={"small"}
            color={"primary"}
            onClick={runCode}
          >
            Rodar
          </Button>
        </div>
        {/* <Button variant={"contained"} color={"primary"} onClick={generateCode}>
          {show ? "Esconder" : "Mostrar"} JavaScript
        </Button> */}
      </div>
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
