import React, { memo, useState } from "react";
import CodeContext from "./CodeContext";

const CodeProvider = memo((props) => {
  const [code, setCode] = useState("");
  const [walk, setWalk] = useState(false);
  const providerWorkspace = React.createRef();

  const state = {
    ...props.state,
    code,
    walk,
  };

  const refs = {
    providerWorkspace,
  };

  const updateCode = (code) => {
    setCode(code);
  };

  const updateWalk = () => {
    setWalk(true);
    setTimeout(() => {
      setWalk(false);
    }, 1500);
  };

  const updateWorkspace = (pWkspc) => {
    providerWorkspace.current = pWkspc;
  };
  const actions = { updateCode, updateWorkspace, updateWalk };

  return (
    <CodeContext.Provider value={{ ...state, ...actions, ...refs }}>
      {props.children}
    </CodeContext.Provider>
  );
});

export default CodeProvider;
