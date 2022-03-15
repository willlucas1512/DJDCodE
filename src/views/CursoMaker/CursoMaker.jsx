import React, { useRef, useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import tilestiles from "./Tiles_32x32.png";
import Style from "./CursoMaker.module.scss";

const CursoMaker = (props) => {
  const [string, setString] = useState("[]");
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
  const mapRows = 8;
  const mapColumns = 18;
  const sourceWidth = 256;
  const sourceHeight = 256;
  let tiles = useRef(new Array(mapColumns * mapRows));
  const mapHeight = mapRows * tileHeight;
  const mapWidth = mapColumns * tileWidth;

  function redrawSource() {
    context.current.drawImage(
      image,
      0,
      0,
      sourceWidth,
      sourceHeight,
      0,
      mapHeight,
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
    if (
      y.current > mapHeight &&
      y.current < mapHeight + sourceHeight &&
      x.current < sourceWidth
    ) {
      // source
      let tileX = Math.floor(x.current / tileWidth);
      let tileY = Math.floor((y.current - mapHeight) / tileHeight);
      sourceTile.current = tileY * (sourceWidth / tileWidth) + tileX;
      sourceX.current = gridX;
      sourceY.current = gridY - mapHeight;
      redrawSource();
      drawBox();
    }

    if (y.current < mapHeight && x.current < mapWidth) {
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
      let tileX = Math.floor(x.current / tileWidth);
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
      sourceY.current + mapHeight,
      tileWidth,
      tileHeight
    );
    context.current.stroke();
  }

  useEffect(() => {
    context.current = canvas.current.getContext("2d");
    for (let i = 0; i <= mapColumns; i++) {
      context.current.moveTo(i * tileWidth, 0);
      context.current.lineTo(i * tileWidth, mapHeight);
    }
    context.current.stroke();
    for (let i = 0; i <= mapRows; i++) {
      context.current.moveTo(0, i * tileHeight);
      context.current.lineTo(mapWidth, i * tileHeight);
    }
    context.current.stroke();
    redrawSource();
    canvas.current.addEventListener("click", doMouseClick);
  }, []);

  return (
    <div className={Style.root}>
      <canvas
        ref={canvas}
        id="myCanvas"
        width="1000"
        height="700"
        style={{ backgroundColor: "white" }}
      ></canvas>
    </div>
  );
};

export default CursoMaker;
