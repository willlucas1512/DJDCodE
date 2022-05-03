import React, { useContext } from "react";
import NavbarContext from "../Navbar/NavbarContext";
import Navbar from "../Navbar";

const SwitchPages = (props) => {
  const { page } = useContext(NavbarContext);

  return page !== "Curso Maker" && <Navbar />;
};

export default SwitchPages;
