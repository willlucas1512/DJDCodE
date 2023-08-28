import React, { useRef, useState, useEffect } from "react";
import tilestiles from "./Tiles_32x32.png";
import BlocksSelector from "../BlocksSelector";
import PropTypes from "prop-types";
import Style from "./Canvas.module.scss";

const Canvas = (props) => {
  const { mapColumns, mapRows, selectedLevel, course, updateCourse } = props;

  const [allTiles, setAllTiles] = useState({});
  const deleteMode = useRef(false);
  const hasSource = useRef(true);
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
      if (
        y.current < sourceHeight &&
        x.current < sourceWidth &&
        hasSource.current
      ) {
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
        x.current > sourceWidth &&
        hasSource.current
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

  function reDrawMap(pHasSource = true) {
    context.current.beginPath();
    context.current.strokeStyle = "black";
    for (let i = 0; i <= mapColumns; i++) {
      const width = pHasSource ? i * tileWidth + sourceWidth : i * tileWidth;
      context.current.moveTo(width, 0);
      context.current.lineTo(width, mapHeight.current);
    }
    context.current.stroke();
    for (let i = 0; i <= mapRows; i++) {
      const height1 = pHasSource ? sourceWidth : 0;
      const height2 = pHasSource
        ? mapWidth.current + sourceWidth
        : mapWidth.current;
      context.current.moveTo(height1, i * tileHeight);
      context.current.lineTo(height2, i * tileHeight);
    }
    context.current.stroke();
    context.current.closePath();
  }

  function reDrawTiles(pTiles, pHasSource = true) {
    context.current.clearRect(
      pHasSource ? sourceWidth : 0,
      0,
      mapWidth.current + 1,
      mapHeight.current + 1
    );
    reDrawMap(pHasSource);
    setTimeout(() => {
      for (let tile in pTiles) {
        if (tile !== undefined) {
          const sourceTile = pTiles[tile];
          const sourceX = pHasSource
            ? sourceTile.targetX
            : sourceTile.targetX - sourceWidth;
          context.current.drawImage(
            image,
            sourceTile.sourceX,
            sourceTile.sourceY,
            tileWidth,
            tileHeight,
            sourceX,
            sourceTile.targetY,
            tileWidth,
            tileHeight
          );
        }
      }
    }, 100);
  }

  function drawImage(pContext) {
    image.onload = function () {
      pContext.drawImage(image, 0, 0);
    };
  }

  function resizeCanvas(pWidth, pHeight) {
    context.current.canvas.width = pWidth;
    context.current.canvas.height = pHeight;
  }

  useEffect(() => {
    context.current = canvas.current.getContext("2d");
    drawImage(context.current);
    resizeCanvas(
      mapWidth.current + sourceWidth,
      Math.max(mapHeight.current, sourceHeight)
    );
    reDrawMap();
    canvas.current.addEventListener("click", doMouseClick);
  }, []);

  useEffect(() => {
    mapHeight.current = mapRows * tileHeight;
    mapWidth.current = mapColumns * tileWidth;
    resizeCanvas(
      hasSource.current ? mapWidth.current + sourceWidth : mapWidth.current,
      Math.max(mapHeight.current, sourceHeight)
    );
    context.current.clearRect(
      hasSource.current ? sourceWidth : 0,
      0,
      mapWidth.current,
      mapHeight.current
    );
    reDrawMap(hasSource.current);
    hasSource.current && drawImage(context.current);
  }, [mapRows, mapColumns]);

  useEffect(() => {
    if (Object.keys(tiles).length !== 0 && !deleteMode.current) {
      setAllTiles((prevState) => ({
        ...prevState,
        [selectedLevel]: { ...allTiles[selectedLevel], ...tiles },
      }));
      updateCourse((prevCourse) => ({
        ...prevCourse,
        niveis: {
          ...prevCourse.niveis,
          [selectedLevel]: {
            ...prevCourse.niveis[selectedLevel],
            tiles: { ...prevCourse.niveis[selectedLevel].tiles, ...tiles },
          },
        },
      }));
    } else if (Object.keys(tiles).length !== 0 && deleteMode.current) {
      setAllTiles((prevState) => ({
        ...prevState,
        [selectedLevel]: { ...tiles },
      }));
      updateCourse((prevCourse) => ({
        ...prevCourse,
        niveis: {
          ...prevCourse.niveis,
          [selectedLevel]: {
            ...prevCourse.niveis[selectedLevel],
            tiles: { ...tiles },
          },
        },
      }));
    }
  }, [tiles]);

  useEffect(() => {
    setTiles({});
    reDrawTiles(allTiles[selectedLevel], props.editType === "map");
  }, [selectedLevel]);

  useEffect(() => {
    if (props.eraseAll) {
      resetCanvas();
    }
  }, [props.eraseAll]);

  useEffect(() => {
    if (props.editType === "map") {
      hasSource.current = true;
      drawImage(context.current);
      resizeCanvas(
        mapWidth.current + sourceWidth,
        Math.max(mapHeight.current, sourceHeight)
      );
      reDrawMap();
      reDrawTiles(allTiles[selectedLevel], true);
    } else {
      hasSource.current = false;
      context.current.clearRect(0, 0, sourceWidth, sourceHeight);
      resizeCanvas(mapWidth.current, mapHeight.current);
      reDrawMap(false);
      reDrawTiles(allTiles[selectedLevel], false);
    }
  }, [props.editType]);

  useEffect(() => {
    deleteMode.current = props.deleteMode;
  }, [props.deleteMode]);
  const xAmountOfColor =
    props.editType === "map"
      ? (sourceWidth * 100) / (sourceWidth + mapColumns * tileWidth)
      : 0;
  return (
    <div className={Style.root}>
      {props.editType === "blocks" && (
        <BlocksSelector
          course={course}
          updateCourse={updateCourse}
          allTiles={allTiles}
          selectedLevel={selectedLevel}
        />
      )}
      <canvas
        ref={canvas}
        id="myCanvas"
        style={{
          background: `linear-gradient(to right, #c5c5c5 ${xAmountOfColor}%, #ffffff ${xAmountOfColor}%)`,
          display: "block",
        }}
      ></canvas>
    </div>
  );
};

Canvas.propTypes = {
  mapColumns: PropTypes.number,
  mapRows: PropTypes.number,
};

export default Canvas;
