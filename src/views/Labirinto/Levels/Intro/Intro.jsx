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
          Boas-vindas ao Labirinto.
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          Seu objetivo é completar o labirinto sem enlouquecer com a
          programação.
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          <b>Regras:</b>
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          O código deve ser rodado já completo, não podendo rodá-lo em partes.
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          Não é permitido, em cada nível, usar a lógica de outros níveis.
        </Typography>
        <Typography align={"center"} color={"textPrimary"}>
          <b>Boa sorte.</b>
        </Typography>
        <div className={Style.signature}>
          <Typography align={"right"} variant={"caption"} color={"textPrimary"}>
            Ass: Dream Team da Robótica
          </Typography>
        </div>
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
