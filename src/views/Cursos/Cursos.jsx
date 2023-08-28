import React from "react";
import services from "../../services";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import Style from "./Cursos.module.scss";
import CardCurso from "../../components/CardCurso/CardCurso";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const getAllCursos = () => {
    services.course.getCourses((rResponse) => {
      console.log(rResponse.courses);
      setCursos(rResponse.courses);
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
