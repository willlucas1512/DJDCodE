import React, { useState } from "react";
import { Modal, Typography, TextField, Button } from "@material-ui/core";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import LevelSelector from "./LevelSelector";
import Style from "./CursoMaker.module.scss";

const CursoMaker = () => {
  const defaultValues = {
    colunas: 12,
    linhas: 8,
    niveis: 3,
  };
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [niveis, setNiveis] = useState(defaultValues.niveis);
  const [mapRows, setMapRows] = useState(defaultValues.linhas);
  const [mapColumns, setMapColumns] = useState(defaultValues.colunas);
  const [modalOpen, setModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMapRows(Number(formValues.linhas));
    setMapColumns(Number(formValues.colunas));
    setNiveis(Number(formValues.niveis));
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div className={Style.modal}>
            <form onSubmit={handleSubmit}>
              <div className={Style.modalContent}>
                <div className={Style.leftColumn}>
                  <Typography
                    color={"textPrimary"}
                    variant={"h6"}
                    id="simple-modal-description"
                  >
                    <b> Insira a quantidade de níveis no seu curso.</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                      inputProps: {
                        max: 3,
                      },
                    }}
                    variant="filled"
                    name="niveis"
                    label="Níveis"
                    type="number"
                    value={formValues.niveis}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={Style.divider}></div>
                <div className={Style.rightColumn}>
                  <Typography
                    color={"textPrimary"}
                    variant={"h6"}
                    id="simple-modal-description"
                  >
                    <b> Insira a quantidade de colunas e linhas do seu mapa.</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <Typography
                    variant={"caption"}
                    color={"textPrimary"}
                    id="simple-modal-description"
                  >
                    <b>Atenção:</b> Editar estes valores no meio da edição do
                    mapa, apagará seu progresso atual.
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                      inputProps: {
                        max: 20,
                      },
                    }}
                    variant="filled"
                    name="colunas"
                    label="Colunas"
                    type="number"
                    value={formValues.colunas}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                      inputProps: {
                        max: 20,
                      },
                    }}
                    variant="filled"
                    name="linhas"
                    label="Linhas"
                    type="number"
                    value={formValues.linhas}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={Style.verticalSpacer}></div>
              <div className={Style.verticalSpacer}></div>
              <div className={Style.button}>
                <Button variant="contained" color="primary" type="submit">
                  Parece bom
                </Button>
              </div>
            </form>
          </div>
        }
      </Modal>
      <div className={Style.root}>
        <div className={Style.canvas}>
          <LevelSelector
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            levels={niveis}
          />
          <Canvas
            selectedLevel={selectedLevel}
            mapRows={mapRows}
            mapColumns={mapColumns}
            levels={niveis}
          />
        </div>
        <Toolbar handleOpen={handleOpen} />
      </div>
    </>
  );
};

export default CursoMaker;
