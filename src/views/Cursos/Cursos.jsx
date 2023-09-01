import React from "react";
import services from "../../services";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import Style from "./Cursos.module.scss";
import CardCurso from "../../components/CardCurso/CardCurso";

function Cursos() {
  const [cursos, setCursos] = useState([]);
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
  const getAllCursos = () => {
    services.course.getCourses((rResponse) => {
      const sortedCourses = sortByCreatedAtDescending(rResponse.courses);
      setCursos(sortedCourses);
    });
  };
  useEffect(() => {
    getAllCursos();
  }, []);
  return (
    <>
      <Typography variant={"h5"} className={Style.title}>
        Cursos publicados
      </Typography>
      <div className={Style.cursos}>
        {cursos.map((course) => {
          return <CardCurso course={course} />;
        })}
      </div>
    </>
  );
}

export default Cursos;
