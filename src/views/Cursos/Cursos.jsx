import React, { useContext } from "react";
import CardCurso from "./CardCurso";
import NavbarContext from "../../Navbar/NavbarContext";
import Style from "./Cursos.module.scss";
import SwitchCourses from "./SwitchCourses/SwitchCourses";

const Cursos = (props) => {
  const { updateCourse, course } = useContext(NavbarContext);
  const courses = {
    labirinto: {
      slug: "labirinto",
      title: "Labirinto",
      description:
        "Aprenda a programar encontrando a saída para o labirinto do Maze Runner!",
      icon: "problemSolving",
    },
    puzzle: {
      slug: "puzzle",
      title: "Quebra-cabeça",
      description:
        "Aprenda a programar resolvendo um quebra-cabeça sobre animais!",
      icon: "puzzle",
    },
    bird: {
      slug: "bird",
      title: "Pássaro",
      description:
        "Aprenda a programar ajudando o passáro a capturar sua presa e retornar ao ninho!",
      icon: "bird",
    },
    movie: {
      slug: "movie",
      title: "Filme",
      description:
        "Aprenda a programar fazendo um filme de animação, desenhando os personagens!",
      icon: "movie",
    },
    geometric: {
      slug: "geometric",
      title: "Formas geométricas",
      description: "Aprenda a programar desenhando formas geométricas!",
      icon: "shapes",
    },
    music: {
      slug: "music",
      title: "Música",
      description:
        "Aprenda a programar compondo músicas que você conhece e gosta de ouvir!",
      icon: "music",
    },
  };

  return course === "" ? (
    <div className={Style.root}>
      {Object.keys(courses).map((value, index) => {
        return (
          <CardCurso
            onClick={updateCourse}
            key={index}
            course={courses[value]}
          />
        );
      })}
    </div>
  ) : (
    <SwitchCourses />
  );
};

export default Cursos;
