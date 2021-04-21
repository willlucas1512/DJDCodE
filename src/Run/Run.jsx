import React, { useRef, useState, useEffect, useContext } from "react";
import BlocklyJS from "blockly/javascript";
import { Button } from "@material-ui/core";
import CodeContext from "./CodeContext";
import PropTypes from "prop-types";
import Style from "./Run.module.scss";

const Run = (props) => {
  const { updateCode } = useContext(CodeContext);
  const demoWorkspace = useRef();
  const [stateCode, setCode] = useState("");
  const [show, setShow] = useState(false);

  const generateCode = () => {
    var code = BlocklyJS.workspaceToCode(demoWorkspace.current.workspace);
    setCode(code);
    updateCode(code);
    setShow(!show);
  };

  const runCode = () => {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    BlocklyJS.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';

    const code = BlocklyJS.workspaceToCode(demoWorkspace.current.workspace);
    setCode(code);
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
    demoWorkspace.current = props.workspace;
  }, [props.workspace]);

  return (
    <>
      <div className={Style.buttons}>
        <div className={Style.button}>
          <Button variant={"contained"} color={"primary"} onClick={runCode}>
            Rodar
          </Button>
        </div>
        <Button variant={"contained"} color={"primary"} onClick={generateCode}>
          {show ? "Esconder" : "Mostrar"} JavaScript
        </Button>
      </div>
      {/* {show && stateCode} */}
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
