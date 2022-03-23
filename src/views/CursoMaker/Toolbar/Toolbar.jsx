import React from "react";
import { IconButton } from "@material-ui/core";
import bin from "./bin.png";
import save from "./save.png";
import undo from "./undo.png";
import done from "./done.png";
import redo from "./redo.png";
import rewind from "./rewind.png";
import add from "./add.png";
import edit from "./edit.png";
import Style from "./Toolbar.module.scss";

const Toolbar = (props) => {
  return (
    <div className={Style.toolbar}>
      <IconButton>
        <img height="30px" width="30px" alt={"Excluir tile"} src={bin} />
      </IconButton>
      <div class={Style.divider}></div>
      <IconButton>
        <img height="30px" width="30px" alt={"Desfazer"} src={undo} />
      </IconButton>
      <IconButton>
        <img height="30px" width="30px" alt={"Refazer"} src={redo} />
      </IconButton>
      <div class={Style.divider}></div>
      <IconButton onClick={props.handleOpen}>
        <img height="30px" width="30px" alt={"Editar"} src={edit} />
      </IconButton>
      <IconButton>
        <img height="30px" width="30px" alt={"Adicionar"} src={add} />
      </IconButton>
      <IconButton>
        <img height="30px" width="30px" alt={"Salvar"} src={save} />
      </IconButton>
      <div class={Style.divider}></div>
      <IconButton>
        <img
          style={{ transform: "scaleX(-1)" }}
          height="30px"
          width="30px"
          alt={"Próximo"}
          src={rewind}
        />
      </IconButton>
      <IconButton>
        <img height="30px" width="30px" alt={"Acabei"} src={done} />
      </IconButton>
    </div>
  );
};

export default Toolbar;
