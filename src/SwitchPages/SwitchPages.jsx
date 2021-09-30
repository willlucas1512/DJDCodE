import React, { useContext } from "react";

import NavbarContext from "../Navbar/NavbarContext";

import Home from "../views/Home";
import Cursos from "../views/Cursos";
import CursoMaker from "../views/CursoMaker";
import MaterialApoio from "../views/MaterialApoio";

const SwitchPages = (props) => {
  const { page } = useContext(NavbarContext);
  return page === "Home" ? (
    <Home />
  ) : page === "Cursos" ? (
    <Cursos />
  ) : page === "Curso Maker" ? (
    <CursoMaker />
  ) : (
    <MaterialApoio />
  );
};

export default SwitchPages;
