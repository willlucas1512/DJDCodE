import React from "react";
import { IconButton } from "@material-ui/core";
import trash from "./trash.png";
import blocks from "./blocks.png";
import eraser from "./eraser.png";
import grid from "./grid.png";
import pencil from "./pencil.png";
import settings from "./settings.png";
import Style from "./Toolbar.module.scss";

const Toolbar = (props) => {
  return (
    <div className={Style.toolbar}>
      <IconButton onClick={props.handleDeleteOpen}>
        <img height="42px" width="42px" alt={"Excluir tudo"} src={trash} />
      </IconButton>
      <IconButton onClick={props.handleDeleteMode}>
        <img
          height="42px"
          width="42px"
          alt={"Excluir tile"}
          src={props.deleteMode ? pencil : eraser}
        />
      </IconButton>
      <div class={Style.divider}></div>
      <IconButton onClick={props.handleEditOpen}>
        <img height="42px" width="42px" alt={"Editar"} src={settings} />
      </IconButton>
      <div class={Style.divider}></div>
      <IconButton onClick={props.handleEditType}>
        <img
          height="42px"
          width="42px"
          alt={"Grid"}
          src={props.editType === "map" ? blocks : grid}
        />
      </IconButton>
    </div>
  );
};

export default Toolbar;
