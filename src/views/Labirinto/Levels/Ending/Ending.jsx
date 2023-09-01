import React from "react";
import Style from "./Ending.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

const Ending = (props) => {
  const backToStart = () => {
    props.updateLevel(1);
  };

  return (
    <div className={Style.root}>
      <div className={Style.instructions}>
        <Typography variant={"h4"} align={"center"} color={"textPrimary"}>
          <b>Escapou!</b>
        </Typography>
        <div className={Style.secret}>
          <Typography
            variant={"caption"}
            align={"center"}
            color={"textPrimary"}
          >
            Será...?
          </Typography>
        </div>
        <Typography variant={"h6"} align={"center"} color={"textPrimary"}>
          Nos veremos no próximo desafio.
        </Typography>

        <div className={Style.buttons}>
          <div className={Style.button}>
            <Button
              variant={"contained"}
              size={"small"}
              color={"inherit"}
              onClick={backToStart}
            >
              Acho que posso fazer melhor...
            </Button>
          </div>
          <Link to={"/home"}>
            <Button variant={"outlined"} size={"small"}>
              Voltar para a home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Ending;
