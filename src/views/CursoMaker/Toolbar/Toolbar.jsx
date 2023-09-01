import React from "react";
import { Link } from "react-router-dom";
import { Button, Dialog, IconButton, Typography } from "@material-ui/core";
import trash from "./trash.png";
import x from "./close.png";
import blocks from "./blocks.png";
import eraser from "./eraser.png";
import grid from "./grid.png";
import pencil from "./pencil.png";
import settings from "./settings.png";
import ideas from "./ideas.png";
import positive from "./positive-vote.png";
import images from "./images.png";
import question from "./question.png";
import Style from "./Toolbar.module.scss";
import services from "../../../services";
import { useState } from "react";

const Toolbar = (props) => {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [error, setError] = useState("");

  const saveCourse = () => {
    services.course.save(
      { course: props.course },
      (rResponse) => {
        handleOpen(setSuccessModalOpen);
      },
      (rError) => {
        console.log(rError);
        setError(rError.data.message);
        handleOpen(setErrorModalOpen);
      }
    );
  };

  const handleClose = (pFunc) => {
    pFunc(false);
  };

  const handleOpen = (pFunc) => {
    pFunc(true);
  };

  const buttons = [
    {
      label: "Ajuda",
      icon: question,
      onClick: props.handleIntroModalOpen,
    },
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
    { label: "adicionar dica", icon: ideas, onClick: props.handleTipOpen },
    {
      label: "Escolher miniatura",
      icon: images,
      onClick: props.handleThumbnailOpen,
    },
    { label: "tudo pronto", icon: positive, onClick: saveCourse },
  ];
  return (
    <>
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
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={errorModalOpen}
        onClose={() => handleClose(setErrorModalOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={Style.modalDelete}>
          <div className={Style.title}>
            <Typography
              color={"textSecondary"}
              variant={"h6"}
              id="simple-modal-description"
            >
              <b> Erro!</b>
            </Typography>
            <IconButton
              className={Style.iconButtonWTitle}
              onClick={() => handleClose(setErrorModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <Typography color={"textSecondary"} variant={"body1"}>
            Não foi possível salvar o seu curso.
          </Typography>

          <Typography color={"textSecondary"} variant={"caption"}>
            {error}
          </Typography>

          <div className={Style.verticalSpacer}></div>
          <div className={Style.buttonsDelete}>
            <Button
              onClick={() => handleClose(setErrorModalOpen)}
              variant="outlined"
              color="primary"
            >
              Ajustar
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={successModalOpen}
        onClose={() => handleClose(setSuccessModalOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={Style.modalDelete}>
          <div className={Style.title}>
            <Typography
              color={"textSecondary"}
              variant={"h6"}
              id="simple-modal-description"
            >
              <b> Sucesso!</b>
            </Typography>
            <IconButton
              className={Style.iconButtonWTitle}
              onClick={() => handleClose(setSuccessModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <Typography color={"textSecondary"} variant={"body1"}>
            Curso salvo com sucesso.
          </Typography>

          <Typography color={"textSecondary"} variant={"caption"}>
            Você pode vê-lo na seção "Meus Cursos".
          </Typography>

          <div className={Style.verticalSpacer}></div>
          <div className={Style.buttonsDelete}>
            <Link to={"/perfil"}>
              <Button variant="outlined" color="primary">
                Ir para Meus Cursos
              </Button>
            </Link>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Toolbar;
