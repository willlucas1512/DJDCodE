import React, { memo, useState } from "react";
import CourseContext from "./CourseContext";

const CourseProvider = memo((props) => {
  const [coursePlaying, setCoursePlaying] = useState({});

  const state = {
    ...props.state,
    coursePlaying,
  };

  const updateCourse = (course) => {
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
