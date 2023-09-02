import React from "react";
import oneone from "./thumbnails/11.png";
import twotwo from "./thumbnails/22.png";
import threethree from "./thumbnails/33.png";
import fourfour from "./thumbnails/44.png";
import Style from "./CardCurso.module.scss";
import { Typography } from "@material-ui/core";

function CardCurso(props) {
  const { course } = props;
  return (
    <div className={Style.curso}>
      <img
        className={Style.thumbnail}
        src={
          course.thumbnail === "11"
            ? oneone
            : course.thumbnail === "22"
            ? twotwo
            : course.thumbnail === "33"
            ? threethree
            : fourfour
        }
      />
      <br />
      <Typography variant={"h6"}>{course.nome}</Typography>
      <br />
      Por: {course.name_first} {course.name_last}
      <br />
      <Typography variant={"body2"}>
        {new Date(course.createdAt).toLocaleString()}
      </Typography>
    </div>
  );
}

export default CardCurso;