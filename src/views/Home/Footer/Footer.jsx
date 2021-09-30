import React from "react";
import Typography from "@material-ui/core/Typography";
import Style from "./Footer.module.scss";

const Footer = (props) => {
  return (
    <div className={Style.copyright}>
      <Typography variant={"caption"} align={"center"}>
        © 2021 Desenvolvimento de Jogos Digitais para a Educação. Todos os
        direitos reservados.
        <br></br>
        Desenvolvido por{" "}
        <a className={Style.me} href={"https://www.github.com/willlucas1512"}>
          William Lucas
        </a>
      </Typography>
    </div>
  );
};

export default Footer;
