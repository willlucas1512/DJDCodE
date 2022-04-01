import React, { useRef, useState, useEffect } from "react";
import tilestiles from "./Tiles_32x32.png";
import PropTypes from "prop-types";

const Canvas = (props) => {
  const { mapColumns, mapRows, selectedLevel } = props;

  const [allTiles, setAllTiles] = useState({});
  const deleteMode = useRef(false);
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
  const [tiles, setTiles] = useState({});
  let mapHeight = useRef(mapRows * tileHeight);
  let mapWidth = useRef(mapColumns * tileWidth);

  function resetCanvas() {
    context.current.clearRect(
      sourceWidth,
      0,
      mapWidth.current + 1,
      mapHeight.current + 1
    );
    setTiles({});
    setAllTiles({});
    reDrawMap();
  }

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
    if (deleteMode.current) {
      if (
        y.current < mapHeight.current &&
        x.current < mapWidth.current + sourceWidth &&
        x.current > sourceWidth
      ) {
        context.current.clearRect(gridX, gridY, tileWidth, tileHeight);
        reDrawMap();
        let tileX = Math.floor(x.current / tileWidth);
        let tileY = Math.floor(y.current / tileHeight);
        let targetTile = tileY * mapColumns + tileX;
        setTiles((prevState) => {
          const state = { ...prevState };
          delete state[targetTile];
          return state;
        });
      }
    } else {
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
        let tileX = Math.floor(x.current / tileWidth);
        let tileY = Math.floor(y.current / tileHeight);
        let targetTile = tileY * mapColumns + tileX;
        setTiles((prevState) => ({
          ...prevState,
          [targetTile]: {
            sourceX: sourceX.current,
            sourceY: sourceY.current,
            targetX: gridX,
            targetY: gridY,
          },
        }));
      }
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
    context.current.closePath();
  }

  function reDrawMap() {
    context.current.beginPath();
    context.current.strokeStyle = "black";
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
    context.current.closePath();
  }

  function reDrawTiles(pTiles) {
    context.current.clearRect(
      sourceWidth,
      0,
      mapWidth.current + 1,
      mapHeight.current + 1
    );
    reDrawMap();
    setTimeout(() => {
      for (let tile in pTiles) {
        if (tile !== undefined) {
          const sourceTile = pTiles[tile];
          context.current.drawImage(
            image,
            sourceTile.sourceX,
            sourceTile.sourceY,
            tileWidth,
            tileHeight,
            sourceTile.targetX,
            sourceTile.targetY,
            tileWidth,
            tileHeight
          );
        }
      }
    }, 100);
  }

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

  useEffect(() => {
    if (Object.keys(tiles).length !== 0 && !deleteMode.current) {
      setAllTiles((prevState) => ({
        ...prevState,
        [selectedLevel]: { ...allTiles[selectedLevel], ...tiles },
      }));
    } else if (Object.keys(tiles).length !== 0 && deleteMode.current) {
      setAllTiles((prevState) => ({
        ...prevState,
        [selectedLevel]: { ...tiles },
      }));
    }
  }, [tiles]);

  useEffect(() => {
    setTiles({});
    reDrawTiles(allTiles[selectedLevel]);
  }, [selectedLevel]);

  useEffect(() => {
    if (props.eraseAll) {
      resetCanvas();
    }
  }, [props.eraseAll]);

  useEffect(() => {
    deleteMode.current = props.deleteMode;
  }, [props.deleteMode]);

  return (
    <canvas
      ref={canvas}
      id="myCanvas"
      style={{ backgroundColor: "white", display: "block" }}
    ></canvas>
  );
};

Canvas.propTypes = {
  mapColumns: PropTypes.number,
  mapRows: PropTypes.number,
};

export default Canvas;
