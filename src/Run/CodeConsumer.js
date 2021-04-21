import React, { memo } from "react";
import CodeContext from "./CodeContext";

const CodeConsumer = memo((props) => {
  return (
    <CodeContext.Consumer>
      {(values) => {
        return React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...values });
          }
          return null;
        });
      }}
    </CodeContext.Consumer>
  );
});

export default CodeConsumer;
