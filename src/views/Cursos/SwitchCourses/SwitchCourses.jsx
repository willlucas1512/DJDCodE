import React, { useContext } from "react";
import NavbarContext from "../../../components/Navbar/NavbarContext";
import Labirinto from "../Labirinto";
import Building from "../Building";

const SwitchCourses = (props) => {
  const { course } = useContext(NavbarContext);
  return course === "labirinto" ? <Labirinto /> : <Building />;
};

export default SwitchCourses;
