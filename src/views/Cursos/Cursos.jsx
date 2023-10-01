import React from "react";
import services from "../../services";
import { useEffect, useContext, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import Style from "./Cursos.module.scss";
import CardCurso from "../../components/CardCurso/CardCurso";
import CourseContext from "../../contexts/Course/CourseContext";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

function Cursos() {
  const { updateCourse } = useContext(CourseContext);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    services.course.getCourses(
      (rResponse) => {
        const sortedCourses = sortByCreatedAtDescending(rResponse.courses);
        setCursos(sortedCourses);
        setLoading(false);
        setError("");
      },
      (rError) => {
        setError(
          "Não foi possível recuperar os cursos publicados. Tente novamente mais tarde."
        );
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    getAllCursos();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Loading width={"50px"} height={"50px"} />
      </Box>
    );
  } else if (error.length > 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant={"h5"} className={Style.title}>
          {error}
        </Typography>
      </Box>
    );
  } else {
    return (
      <>
        <Typography variant={"h5"} className={Style.title}>
          Cursos publicados
        </Typography>
        <div className={Style.cursos}>
          {cursos.map((course, index) => {
            return (
              <Link
                onClick={() => updateCourse(course)}
                key={index}
                to={"/cursoplayer"}
              >
                <CardCurso course={course} />{" "}
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}

export default Cursos;
