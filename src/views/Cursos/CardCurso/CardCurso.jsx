import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Style from "./CardCurso.module.scss";

const useStyles = makeStyles({
  root: {
    backgroundColor: "whitesmoke",
  },
  button: {
    height: "100%",
  },
  card: {
    padding: "24px",
  },
});

function CardCurso(props) {
  const { description, title, icon, slug } = props.course;
  const classes = useStyles();
  const iconClass = classNames({
    [Style.problemSolving]: icon === "problemSolving",
    [Style.puzzle]: icon === "puzzle",
    [Style.bird]: icon === "bird",
    [Style.shapes]: icon === "shapes",
    [Style.movie]: icon === "movie",
    [Style.music]: icon === "music",
  });

  return (
    <Card
      onClick={() => props.onClick(slug)}
      raised={true}
      className={classes.root}
    >
      <CardActionArea className={classes.button}>
        <CardContent className={classes.card}>
          <div className={Style.image}>
            <div className={iconClass}>
              <span></span>
            </div>
          </div>
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
