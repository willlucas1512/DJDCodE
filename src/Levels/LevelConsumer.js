import React, { memo } from "react";
import LevelContext from "./LevelContext";

const LevelConsumer = memo((props) => {
  return (
    <LevelContext.Consumer>
      {(values) => {
        return React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...values });
          }
          return null;
        });
      }}
    </LevelContext.Consumer>
  );
});

export default LevelConsumer;
