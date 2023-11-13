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
          O nosso herói está preso nas profundezas do labirinto. <br /> O seu
          objetivo é ajudá-lo a escapar, sem enlouquecer com a programação, em 5
          níveis.
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          <b>Avisos:</b>
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          Clique em RODAR quando achar que terminou e aguarde para ver o
          resultado.
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          Se fechar a página ou sair do labirinto durante seu progresso, terá
          que recomeçar do nível 1.
        </Typography>
        <Typography variant={"body1"} align={"center"} color={"textPrimary"}>
          Você pode ver a dica novamente, se clicar na lâmpada.
        </Typography>
        <Typography align={"center"} color={"textPrimary"}>
          <b>Boa sorte.</b>
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
