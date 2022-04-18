import React from "react";
import { Button } from "@material-ui/core";
import trash from "./trash.png";
import blocks from "./blocks.png";
import eraser from "./eraser.png";
import grid from "./grid.png";
import pencil from "./pencil.png";
import settings from "./settings.png";
import ideas from "./ideas.png";
import Style from "./Toolbar.module.scss";

const Toolbar = (props) => {
  const buttons = [
    {
      label: props.editType === "map" ? "Blocos" : "Mapa",
      icon: props.editType === "map" ? blocks : grid,
      alt: "Blocos",
      onClick: props.handleEditType,
    },
    {
      label: props.deleteMode ? "Inserir" : "Apagar",
      icon: props.deleteMode ? pencil : eraser,
      onClick: props.handleDeleteMode,
    },
    { label: "Excluir tudo", icon: trash, onClick: props.handleDeleteOpen },
    { label: "Editar", icon: settings, onClick: props.handleEditOpen },
    { label: "inserir dica", icon: ideas, onClick: props.handleTipOpen },
  ];
  return (
    <div className={Style.toolbar}>
      {buttons.map((button, index) => (
        <div key={index} className={Style.button}>
          <Button
            variant={"contained"}
            onClick={button.onClick}
            size={"small"}
            startIcon={
              <img
                height="32px"
                width="32px"
                alt={button.alt}
                src={button.icon}
              />
            }
          >
            {button.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
