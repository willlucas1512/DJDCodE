import React from "react";

import Style from "./CardCurso.module.scss";

function CardCurso(props) {
  const { course } = props;
  return (
    <div className={Style.curso}>
      {course.nome}
      <br />
      Feito por: {course.name_first} {course.name_last}
      <br />
      {new Date(course.createdAt).toLocaleString()}
    </div>
  );
}

export default CardCurso;
