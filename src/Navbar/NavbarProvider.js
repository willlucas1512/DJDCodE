import React, { memo, useState } from "react";
import NavbarContext from "./NavbarContext";

const NavbarProvider = memo((props) => {
  const [page, setPage] = useState("Home");
  const [course, setCourse] = useState("");

  const state = {
    ...props.state,
    page,
    course,
  };

  const updatePage = (pPage) => {
    if (pPage === page && pPage === "Cursos") {
      setCourse("");
    } else if (pPage !== "Cursos") {
      setCourse("");
    }
    setPage(pPage);
  };

  const updateCourse = (course) => {
    setCourse(course);
  };

  const actions = { updatePage, updateCourse };

  return (
    <NavbarContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </NavbarContext.Provider>
  );
});

export default NavbarProvider;
