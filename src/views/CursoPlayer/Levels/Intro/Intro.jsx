import React from "react";
import Style from "./Intro.module.scss";
import { Typography, Button } from "@material-ui/core";

const Intro = (props) => {
  const goToNextLevel = () => {
    props.updateLevel(1);
  };
  return (
    <div className={Style.root}>
      <div className={Style.instructions}>
        <Typography variant={"h6"} align={"center"} color={"textPrimary"}>
          {props.nome}
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          {props.introducao}
        </Typography>

        <div className={Style.button}>
          <Button
            variant={"contained"}
            size={"small"}
            color={"inherit"}
            onClick={goToNextLevel}
          >
            Vamos lá!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
