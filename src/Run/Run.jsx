import React, { useRef, useState, useEffect } from "react";
import BlocklyJS from "blockly/javascript";
import PropTypes from "prop-types";

const Run = (props) => {
  const demoWorkspace = useRef();
  const [stateCode, setCode] = useState("");
  const [show, setShow] = useState(false);

  const generateCode = () => {
    var code = BlocklyJS.workspaceToCode(demoWorkspace.current.workspace);
    setCode(code);
    setShow(!show);
  };

  const runCode = () => {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    BlocklyJS.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';

    const code = BlocklyJS.workspaceToCode(demoWorkspace.current.workspace);
    setCode(code);
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
      <button onClick={generateCode}>
        {show ? "Esconder" : "Mostrar"} JavaScript
      </button>
      <button onClick={runCode}>Rodar</button>
      {show && stateCode}
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
