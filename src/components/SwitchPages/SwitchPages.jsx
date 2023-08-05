import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

const SwitchPages = (props) => {
  const location = useLocation();

  return location.pathname !== "/cursomaker" && <Navbar />;
};

export default SwitchPages;
