import React, { useState } from "react";
import {
  Dialog,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import MobileNavbar from "../../MobileNavbar/MobileNavbar";
import LevelSelector from "./LevelSelector";
import classNames from "classnames";
import x from "./close.png";
import Style from "./CursoMaker.module.scss";

const CursoMaker = () => {
  const defaultValues = {
    colunas: 12,
    linhas: 8,
    niveis: 10,
    introducao: "",
    dicas: "",
  };
  const [course, setCourse] = useState([{}, {}, {}, {}]);
  const [editType, setEditType] = useState("map");
  const [deleteMode, setDeleteMode] = useState(false);
  const [eraseAll, setEraseAll] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [niveis, setNiveis] = useState(defaultValues.niveis);
  const [mapRows, setMapRows] = useState(defaultValues.linhas);
  const [mapColumns, setMapColumns] = useState(defaultValues.colunas);
  const [introducao, setIntroducao] = useState(defaultValues.introducao);
  const [dicas, setDicas] = useState(defaultValues.dicas);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const xValue = name === "dicas" ? [...dicas, ...value] : value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event, setOpen) => {
    event.preventDefault();
    setMapRows(Number(formValues.linhas));
    setMapColumns(Number(formValues.colunas));
    setNiveis(Number(formValues.niveis));
    setIntroducao(formValues.introducao);
    setDicas(formValues.dicas);
    handleClose(setOpen);
  };

  const handleClose = (pFunc) => {
    pFunc(false);
  };

  const handleOpen = (pFunc) => {
    pFunc(true);
  };

  const updateCourse = (pNewCourse) => {
    setCourse(pNewCourse);
  };

  const handleEditType = () => {
    setEditType(editType === "map" ? "blocks" : "map");
  };

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const eraseAllTiles = () => {
    setEraseAll(true);
    setTimeout(() => {
      setEraseAll(false);
    }, 100);
    handleClose(setDeleteModalOpen);
  };

  const gridClass = classNames({
    [Style.canvas_map]: editType === "map",
    [Style.canvas_blocks]: editType === "blocks",
  });

  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={editModalOpen}
        onClose={() => handleClose(setEditModalOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div className={Style.modal}>
            <div className={Style.noTitle}>
              <IconButton
                className={Style.iconButtonNoTitle}
                onClick={() => handleClose(setEditModalOpen)}
              >
                <img src={x} alt={"x"} height={"16px"} width={"16px"} />
              </IconButton>
            </div>
            <form onSubmit={(e) => handleSubmit(e, setEditModalOpen)}>
              <div className={Style.modalContent}>
                <div className={Style.input1}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b> Quantidade de colunas e linhas no mapa</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <Typography
                    variant={"caption"}
                    color={"textSecondary"}
                    id="simple-modal-description"
                  >
                    <b>Atenção:</b> Editar estes valores no meio da edição do
                    mapa, apagará seu progresso atual.
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputProps={{
                      inputProps: {
                        max: 20,
                        style: { color: "#303030" },
                      },
                    }}
                    variant="outlined"
                    name="colunas"
                    label="Colunas"
                    type="number"
                    value={formValues.colunas}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputProps={{
                      inputProps: {
                        max: 20,
                        style: { color: "#303030" },
                      },
                    }}
                    variant="outlined"
                    name="linhas"
                    label="Linhas"
                    type="number"
                    value={formValues.linhas}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={Style.input2}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b> Texto de introdução</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    variant={"outlined"}
                    inputProps={{
                      style: { color: "#303030" },
                    }}
                    name="introducao"
                    label="Introdução"
                    multiline
                    rows="3"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={Style.verticalSpacer}></div>
                <div className={Style.input3}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b> Quantidade de níveis</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputProps={{
                      inputProps: {
                        max: 10,
                        style: { color: "#303030" },
                      },
                    }}
                    variant="outlined"
                    name="niveis"
                    label="Níveis"
                    type="number"
                    value={formValues.niveis}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className={Style.button}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Parece bom
                </Button>
              </div>
            </form>
          </div>
        }
      </Dialog>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={deleteModalOpen}
        onClose={() => handleClose(setDeleteModalOpen)}
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
              <b> Apagar tudo?</b>
            </Typography>
            <IconButton
              className={Style.iconButtonWTitle}
              onClick={() => handleClose(setDeleteModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <Typography
            color={"textSecondary"}
            variant={"caption"}
            id="simple-modal-description"
          >
            Essa ação limpará todos os níveis, para você começar do zero.
          </Typography>
          <div className={Style.verticalSpacer}></div>
          <div className={Style.buttonsDelete}>
            <Button
              onClick={() => handleClose(setDeleteModalOpen)}
              variant="outlined"
              color="primary"
            >
              Calma, não!
            </Button>
            <div className={Style.horizontalSpacer}></div>
            <Button onClick={eraseAllTiles} variant="contained" color="primary">
              Apagar
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        onClose={() => handleClose(setTipModalOpen)}
        open={tipModalOpen}
      >
        <div className={Style.tipModal}>
          <div className={Style.title}>
            <Typography variant={"h6"} color={"textSecondary"}>
              Dica do nível <b>{selectedLevel}</b>
            </Typography>
            <IconButton
              className={Style.iconButton}
              onClick={() => handleClose(setTipModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <div className={Style.verticalSpacer}></div>
          <form onSubmit={(e) => handleSubmit(e, setTipModalOpen)}>
            <TextField
              variant={"outlined"}
              inputProps={{
                style: { color: "#303030" },
              }}
              name="dicas"
              label="Dica"
              multiline
              rows="3"
              onChange={(e) => handleInputChange(e)}
              fullWidth
            />
            <div className={Style.verticalSpacer}></div>
            <div className={Style.button}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Parece bom
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
      <div className={Style.root}>
        <div className={Style.menu}>
          <MobileNavbar />
          <div className={Style.menu_levels}>
            <LevelSelector
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              levels={niveis}
            />
          </div>
        </div>
        <div className={gridClass}>
          <Canvas
            course={course}
            updateCourse={updateCourse}
            editType={editType}
            deleteMode={deleteMode}
            eraseAll={eraseAll}
            selectedLevel={selectedLevel}
            mapRows={mapRows}
            mapColumns={mapColumns}
            levels={niveis}
          />
          <Toolbar
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            levels={niveis}
            editType={editType}
            handleEditType={handleEditType}
            handleDeleteMode={handleDeleteMode}
            deleteMode={deleteMode}
            handleDeleteOpen={() => handleOpen(setDeleteModalOpen)}
            handleEditOpen={() => handleOpen(setEditModalOpen)}
            handleTipOpen={() => handleOpen(setTipModalOpen)}
          />
        </div>
      </div>
    </>
  );
};

export default CursoMaker;
