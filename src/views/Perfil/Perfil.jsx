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
import Loading from "../../components/Loading";
import { Box } from "@material-ui/core";

function Perfil() {
  const { updateCourse } = useContext(CourseContext);
  const [courses, setCourses] = useState([]);
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
  const getCourses = () => {
    setLoading(true);
    services.course.getUserCourses(
      (rResponse) => {
        const sortedCourses = sortByCreatedAtDescending(rResponse.courses);
        setCourses(sortedCourses);
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
    getCourses();
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
  } else if (courses.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant={"h5"} className={Style.title}>
          Você ainda não tem nenhum curso. Experimente criar um, na seção{" "}
          <Link to={"/cursomaker"}>Curso Maker</Link>!
        </Typography>
      </Box>
    );
  } else {
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
}

export default Perfil;
