import React, { memo, useState } from "react";
import NavbarContext from "./NavbarContext";

const NavbarProvider = memo((props) => {
  const [page, setPage] = useState("Home");

  const state = {
    ...props.state,
    page,
  };

  const updatePage = (code) => {
    setPage(code);
  };

  const actions = { updatePage };

  return (
    <NavbarContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </NavbarContext.Provider>
  );
});

export default NavbarProvider;
