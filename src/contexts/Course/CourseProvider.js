import React, { memo, useContext, useState } from "react";
import CourseContext from "./CourseContext";
import LevelContext from "../Level/LevelContext";

const CourseProvider = memo((props) => {
  const { updateLevel } = useContext(LevelContext);
  const [coursePlaying, setCoursePlaying] = useState({});

  const state = {
    ...props.state,
    coursePlaying,
  };

  const updateCourse = (course) => {
    updateLevel(0);
    setCoursePlaying(course);
    localStorage.removeItem("course");
    localStorage.setItem("course", JSON.stringify(course));
  };

  const actions = { updateCourse };

  return (
    <CourseContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </CourseContext.Provider>
  );
});

export default CourseProvider;
