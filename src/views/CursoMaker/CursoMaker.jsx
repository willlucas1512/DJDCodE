import React, { useRef, useState, useEffect } from "react";
import { Modal, Typography, TextField, Button } from "@material-ui/core";
import Toolbar from "./Toolbar";
import tilestiles from "./Tiles_32x32.png";
import Style from "./CursoMaker.module.scss";

const CursoMaker = (props) => {
  const defaultValues = {
    colunas: 12,
    linhas: 8,
  };
  const [string, setString] = useState("[]");
  const [mapRows, setMapRows] = useState(10);
  const [mapColumns, setMapColumns] = useState(18);
  const [askColsRows, setAskColsRows] = useState(true);
  const [formValues, setFormValues] = useState(defaultValues);
  let x = useRef(0);
  let y = useRef(0);
  let sourceX = useRef(0);
  let sourceY = useRef(0);
  let sourceTile = useRef(0);

  const canvas = useRef(null);
  const context = useRef();

  let image = new Image();
  image.src = tilestiles;
  const tileWidth = 32;
  const tileHeight = 32;

  const sourceWidth = 256;
  const sourceHeight = 256;
  let tiles = useRef(new Array(mapColumns * mapRows));
  let mapHeight = useRef(mapRows * tileHeight);
  let mapWidth = useRef(mapColumns * tileWidth);

  function redrawSource() {
    context.current.clearRect(0, 0, sourceWidth, sourceHeight);
    context.current.drawImage(
      image,
      0,
      0,
      sourceWidth,
      sourceHeight,
      0,
      0,
      sourceWidth,
      sourceHeight
    );
  }

  function doMouseClick(e) {
    const bounding = canvas.current.getBoundingClientRect();
    x.current = e.clientX - bounding.left;
    y.current = e.clientY - bounding.top;
    let gridX = Math.floor(x.current / tileWidth) * tileWidth;
    let gridY = Math.floor(y.current / tileHeight) * tileHeight;
    if (y.current < sourceHeight && x.current < sourceWidth) {
      // source
      let tileX = Math.floor(x.current / tileWidth);
      let tileY = Math.floor(y.current / tileHeight);
      sourceTile.current = tileY * (sourceWidth / tileWidth) + tileX;
      sourceX.current = gridX;
      sourceY.current = gridY;
      redrawSource();
      drawBox();
    }

    if (
      y.current < mapHeight.current &&
      x.current < mapWidth.current + sourceWidth &&
      x.current > sourceWidth
    ) {
      // target
      context.current.clearRect(gridX, gridY, tileWidth, tileHeight);
      context.current.drawImage(
        image,
        sourceX.current,
        sourceY.current,
        tileWidth,
        tileHeight,
        gridX,
        gridY,
        tileWidth,
        tileHeight
      );
      let tileX = Math.floor(x.current + sourceWidth / tileWidth);
      let tileY = Math.floor(y.current / tileHeight);
      let targetTile = tileY * mapColumns + tileX;
      tiles.current[targetTile] = sourceTile.current;

      // update the string
      let Sstring = "[";
      for (let i = 0; i < mapColumns * mapRows; i++) {
        if (tiles.current[i] !== undefined) {
          Sstring = Sstring + tiles.current[i];
        }
        Sstring = Sstring + ",";
      }
      Sstring = Sstring + "]";
      setString(Sstring);
    }
  }

  function drawBox() {
    context.current.beginPath();
    context.current.strokeStyle = "red";
    context.current.rect(
      sourceX.current,
      sourceY.current,
      tileWidth,
      tileHeight
    );
    context.current.stroke();
  }

  function reDrawMap() {
    for (let i = 0; i <= mapColumns; i++) {
      context.current.moveTo(i * tileWidth + sourceWidth, 0);
      context.current.lineTo(i * tileWidth + sourceWidth, mapHeight.current);
    }
    context.current.stroke();
    for (let i = 0; i <= mapRows; i++) {
      context.current.moveTo(sourceWidth, i * tileHeight);
      context.current.lineTo(mapWidth.current + sourceWidth, i * tileHeight);
    }
    context.current.stroke();
  }

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
    handleClose();
  };

  const handleClose = () => {
    setAskColsRows(false);
  };

  const handleOpen = () => {
    setAskColsRows(true);
  };

  useEffect(() => {
    context.current = canvas.current.getContext("2d");
    image.onload = function () {
      context.current.drawImage(image, 0, 0);
    };
    context.current.canvas.width = mapWidth.current + sourceWidth + 16;
    context.current.canvas.height =
      Math.max(mapHeight.current, sourceHeight) + 16;
    reDrawMap();
    canvas.current.addEventListener("click", doMouseClick);
  }, []);

  useEffect(() => {
    mapHeight.current = mapRows * tileHeight;
    mapWidth.current = mapColumns * tileWidth;
    context.current.canvas.width = mapWidth.current + sourceWidth + 16;
    context.current.canvas.height =
      Math.max(mapHeight.current, sourceHeight) + 16;
    context.current.clearRect(
      sourceWidth,
      0,
      mapWidth.current,
      mapHeight.current
    );
    reDrawMap();
    image.onload = function () {
      context.current.drawImage(image, 0, 0);
    };
  }, [mapRows, mapColumns]);

  return (
    <>
      <Modal
        open={askColsRows}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div className={Style.modal}>
            <form onSubmit={handleSubmit}>
              <Typography
                color={"textPrimary"}
                variant={"h5"}
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
                <b>Atenção:</b> Editar estes valores no meio da edição do mapa
                apagará seu progresso atual.
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
                id="age-input"
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
                id="age-input"
                name="linhas"
                label="Linhas"
                type="number"
                value={formValues.linhas}
                onChange={handleInputChange}
              />
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
        <canvas
          ref={canvas}
          id="myCanvas"
          style={{ backgroundColor: "white", display: "block" }}
        ></canvas>
        <Toolbar handleOpen={handleOpen} />
      </div>
    </>
  );
};

export default CursoMaker;
