import React, { memo } from "react";
import MazeContext from "./MazeContext";

const MazeConsumer = memo((props) => {
  return (
    <MazeContext.Consumer>
      {(values) => {
        return React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...values });
          }
          return null;
        });
      }}
    </MazeContext.Consumer>
  );
});

export default MazeConsumer;
