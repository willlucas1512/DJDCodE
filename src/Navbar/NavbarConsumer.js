import React, { memo } from "react";
import NavbarContext from "./NavbarContext";

const NavbarConsumer = memo((props) => {
  return (
    <NavbarContext.Consumer>
      {(values) => {
        return React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...values });
          }
          return null;
        });
      }}
    </NavbarContext.Consumer>
  );
});

export default NavbarConsumer;
