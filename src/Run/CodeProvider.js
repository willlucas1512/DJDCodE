import React, { memo, useState } from "react";
import CodeContext from "./CodeContext";

const CodeProvider = memo((props) => {
  const [code, setCode] = useState("");
  const [walk, setWalk] = useState(false);
  const [maze, setMaze] = useState();
  const providerWorkspace = React.createRef();

  const state = {
    ...props.state,
    code,
    walk,
    maze,
  };

  const refs = {
    providerWorkspace,
  };

  const updateCode = (code) => {
    setCode(code);
  };

  const updateMaze = (pMaze) => {
    setMaze(pMaze);
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
  const actions = { updateCode, updateWorkspace, updateWalk, updateMaze };

  return (
    <CodeContext.Provider value={{ ...state, ...actions, ...refs }}>
      {props.children}
    </CodeContext.Provider>
  );
});

export default CodeProvider;
