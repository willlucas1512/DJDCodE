import React from "react";
import { IconButton, Typography } from "@material-ui/core";
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
      <IconButton style={{ padding: "0 12px" }} onClick={props.handleEditType}>
        <img
          height="36px"
          width="36px"
          alt={"Grid"}
          src={props.editType === "map" ? blocks : grid}
        />
      </IconButton>
      <Typography color={"textPrimary"} variant={"caption"}>
        {props.editType === "map" ? "Blocos" : "Mapa"}
      </Typography>
      <div className={Style.verticalSpacer}></div>
      <div className={Style.divider}></div>
      <IconButton
        style={{ padding: "8px 12px" }}
        onClick={props.handleEditOpen}
      >
        <img height="36px" width="36px" alt={"Editar"} src={settings} />
      </IconButton>
      <Typography color={"textPrimary"} variant={"caption"}>
        {"Editar"}
      </Typography>
      <div className={Style.verticalSpacer}></div>
      <div className={Style.divider}></div>
      <IconButton
        style={{ padding: "8px 12px" }}
        onClick={props.handleDeleteMode}
      >
        <img
          height="36px"
          width="36px"
          alt={"Excluir tile"}
          src={props.deleteMode ? pencil : eraser}
        />
      </IconButton>
      <Typography color={"textPrimary"} variant={"caption"}>
        {"Apagar"}
      </Typography>
      <div className={Style.verticalSpacer}></div>
      <div className={Style.divider}></div>
      <IconButton
        style={{ padding: "8px 12px" }}
        onClick={props.handleDeleteOpen}
      >
        <img height="36px" width="36px" alt={"Excluir tudo"} src={trash} />
      </IconButton>
      <Typography align={"center"} color={"textPrimary"} variant={"caption"}>
        {"Excluir tudo"}
      </Typography>
      <div className={Style.verticalSpacer}></div>
    </div>
  );
};

export default Toolbar;
