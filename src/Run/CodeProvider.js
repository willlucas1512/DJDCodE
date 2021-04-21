import React, { memo, useState } from "react";
import CodeContext from "./CodeContext";

const CodeProvider = memo((props) => {
  const [code, setCode] = useState("");

  const state = {
    ...props.state,
    code,
  };

  const updateCode = (code) => {
    setCode(code);
  };
  const actions = { updateCode };

  return (
    <CodeContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </CodeContext.Provider>
  );
});

export default CodeProvider;
