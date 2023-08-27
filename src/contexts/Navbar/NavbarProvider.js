import React, { memo, useState } from "react";
import NavbarContext from "./NavbarContext";

const NavbarProvider = memo((props) => {
  const [page, setPage] = useState("Home");
  const [course, setCourse] = useState("");
  const [resetLevel, setResetLevel] = useState(false);

  const state = {
    ...props.state,
    page,
    course,
    resetLevel,
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

  const updateResetLevel = () => {
    setResetLevel(true);
    setTimeout(() => setResetLevel(false), 3000);
  };

  const actions = { updatePage, updateCourse, updateResetLevel };

  return (
    <NavbarContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </NavbarContext.Provider>
  );
});

export default NavbarProvider;
