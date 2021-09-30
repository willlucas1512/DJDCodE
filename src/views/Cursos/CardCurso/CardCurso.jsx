import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import problemSolving from "./problemSolving.png";
import puzzle from "./puzzle.png";
import bird from "./bird.png";
import shapes from "./shapes.png";
import movie from "./clapperboard.png";
import music from "./party.png";
import Style from "./CardCurso.module.scss";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f9f9f9",
  },
  rowGap: {
    marginBottom: "15%",
  },
  button: {
    height: "100%",
  },
  card: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

function CardCurso(props) {
  const { description, title, icon, slug } = props.course;
  const classes = useStyles();
  let iconPath =
    icon === "problemSolving"
      ? problemSolving
      : icon === "puzzle"
      ? puzzle
      : icon === "bird"
      ? bird
      : icon === "shapes"
      ? shapes
      : icon === "movie"
      ? movie
      : music;

  const rowGapClass = classNames(classes.root, {
    [Style.rowGap]: props.index === 0 || props.index === 1 || props.index === 2,
  });
  return (
    <Card
      onClick={() => props.onClick(slug)}
      raised={true}
      className={rowGapClass}
    >
      <CardActionArea className={classes.button}>
        <CardContent className={classes.card}>
          <img src={iconPath} style={{ width: "45%", height: "45%" }} />
          <div className={Style.vSpacer}></div>
          <div className={Style.text}>
            <Typography
              align="center"
              gutterBottom
              color="textSecondary"
              variant="h5"
            >
              {title}
            </Typography>
            <Typography align="center" variant="body2" color="textSecondary">
              {description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardCurso;
