import React from "react";
import Typography from "../Home/Typography/Typography";
import Style from "./Perfil.module.scss";
import services from "../../services";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CourseContext from "../../contexts/Course/CourseContext";
import CardCurso from "../../components/CardCurso/CardCurso";

function Perfil() {
  const { updateCourse } = useContext(CourseContext);
  const [courses, setCourses] = useState([]);
  function sortByCreatedAtDescending(arr) {
    arr.sort(function (a, b) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      }
      return dateB - dateA;
    });
    return arr;
  }
  const getCourses = () => {
    services.course.getUserCourses(
      (rResponse) => {
        const sortedCourses = sortByCreatedAtDescending(rResponse.courses);
        setCourses(sortedCourses);
      },
      (rError) => {
        alert("error!");
      }
    );
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <Typography variant={"h5"} className={Style.title}>
        Meus Cursos
      </Typography>
      <div className={Style.cursos}>
        {courses.map((course, index) => {
          return (
            <Link
              onClick={() => updateCourse(course)}
              key={index}
              to={"/cursoplayer"}
            >
              <CardCurso course={course} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Perfil;
