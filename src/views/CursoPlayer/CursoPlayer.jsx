import React from "react";
import Levels from "./Levels";
import { useContext } from "react";
import CourseContext from "../../contexts/Course/CourseContext";

function CursoPlayer() {
  const { coursePlaying } = useContext(CourseContext);

  return <Levels coursePlaying={coursePlaying} />;
}

export default CursoPlayer;
