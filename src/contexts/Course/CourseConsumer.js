import React, { memo } from "react";
import CourseContext from "./CourseContext";

const CourseConsumer = memo((props) => {
  return (
    <CourseContext.Consumer>
      {(values) => {
        return React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...values });
          }
          return null;
        });
      }}
    </CourseContext.Consumer>
  );
});

export default CourseConsumer;
