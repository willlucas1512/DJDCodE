import React, { useState, useEffect, useContext } from "react";
import Level from "./Level";
import Intro from "./Intro";
import Ending from "./Ending";
import LevelContext from "../../../contexts/Level/LevelContext";

const Levels = (props) => {
  const layouts = [
    [[]],
    [
      [["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["entrance"], ["wall"], ["wall"]],
      [["wall"], ["wall"], [], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["key"], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["nubbin"], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["door", "exit"], ["wall"], ["wall"]],
    ],
    [
      [["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["entrance"], ["wall"], ["wall"]],
      [["wall"], ["wall"], [], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["key"], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["nubbin"], ["wall"], ["wall"]],
      [["wall"], ["wall"], ["door", "exit"], ["wall"], ["wall"]],
    ],
    [
      [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
      [["wall"], ["wall"], [], [], [], ["wall"]],
      [["wall"], ["wall"], ["door", "exit"], ["wall"], [], ["wall"]],
      [["wall"], ["wall"], ["wall"], ["wall"], ["key"], ["wall"]],
      [["wall"], ["entrance"], [], [], [], ["wall"]],
      [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
    ],
    [
      [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
      [["wall"], ["wall"], [], [], [], ["wall"]],
      [["wall"], ["wall"], ["door", "exit"], ["wall"], [], ["wall"]],
      [["wall"], ["wall"], ["wall"], ["wall"], ["key"], ["wall"]],
      [["wall"], ["entrance"], [], [], [], ["wall"]],
      [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
    ],
    [
      [
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["door, exit"],
        ["wall"],
        ["wall"],
        ["wall"],
      ],
      [["wall"], [], ["wall"], [], ["wall"], [], [], [], [], ["wall"]],
      [
        ["wall"],
        [],
        ["wall"],
        [],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        [],
        ["wall"],
      ],

      [["wall"], [], [], [], [], [], [], [], [], ["wall"]],
      [
        ["wall"],
        ["wall"],
        ["wall"],
        [],
        ["wall"],
        [],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
      ],
      [["wall"], [], [], [], ["wall"], [], [], [], [], ["wall"]],
      [
        ["wall"],
        [],
        ["wall"],
        ["wall"],
        ["wall"],
        [],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
      ],
      [["wall"], [], [], [], ["wall"], [], [], [], [], ["wall"]],
      [
        ["wall"],
        [],
        ["wall"],
        ["wall"],
        ["wall"],
        [],
        ["wall"],
        ["wall"],
        [],
        ["wall"],
      ],
      [["wall"], [], [], [], ["wall"], [], [], ["wall"], ["key"], ["wall"]],
      [
        ["wall"],
        ["wall"],
        ["entrance"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
        ["wall"],
      ],
    ],
    [[]],
  ];
  const [selectedCourse, setSelectedCourse] = useState(
    JSON.parse(localStorage.getItem("course"))
  );
  const [isMobile, setIsMobile] = useState(false);
  const [currentLevelState, setCurrentLevelState] = useState({
    level: 0,
    layout: layouts[1],
    hint: "",
  });
  const { currentLevel, updateLevel } = useContext(LevelContext);
  const IsMobile = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const isDoor = (sourceX, sourceY) => {
    return (
      sourceY === 160 &&
      (sourceX === 64 || sourceX === 96 || sourceX === 160 || sourceX === 128)
    );
  };

  const isEntrance = (sourceX, sourceY) => {
    return sourceX === 160 && sourceY === 96;
  };

  const isKey = (sourceX, sourceY) => {
    return (
      sourceX === 224 && (sourceY === 0 || sourceY === 32 || sourceY === 64)
    );
  };

  const isNubbin = (sourceX, sourceY) => {
    return (
      sourceX === 192 && (sourceY === 0 || sourceY === 32 || sourceY === 64)
    );
  };

  const generateLayout = (pLinhas, pColunas, tilePositions) => {
    const grid = [];

    for (let y = 0; y < pLinhas; y++) {
      const linha = [];
      for (let x = 0; x < pColunas; x++) {
        const square = {
          x: 256 + x * 32,
          y: y * 32,
          tile: null,
          type: [],
        };
        const match = Object.values(tilePositions).find(
          (element) =>
            element.targetX === square.x && element.targetY === square.y
        );
        if (match) {
          square.tile = { sourceX: match.sourceX, sourceY: match.sourceY };
          // if (isDoor(match.sourceX, match.sourceY)) {
          //   square.type = ["door", "exit"];
          // } else if (isEntrance(match.sourceX, match.sourceY)) {
          //   square.type = ["entrance"];
          // } else if (isKey(match.sourceX, match.sourceY)) {
          //   square.type = ["key"];
          // } else if (isNubbin(match.sourceX, match.sourceY)) {
          //   square.type = ["nubbin"];
          // } else {
          // square.type = ["wall"];
          square.type = [getPositionString(match.sourceX, match.sourceY)];
          // }
        }
        linha.push(square.type);
      }
      grid.push(linha);
    }

    return grid;
  };

  function getPositionString(x, y) {
    const squareSize = 32;
    const row = Math.floor(y / squareSize) + 1;
    const column = Math.floor(x / squareSize) + 1;

    return `tile-${row}-${column}`;
  }

  const updateLocalLevel = (level) => {
    setCurrentLevelState({
      level: level,
      layout: generateLayout(
        selectedCourse.linhas,
        selectedCourse.colunas,
        selectedCourse.niveis[level]?.tiles
      ),
      hint: selectedCourse.niveis[level]?.dica,
      blocos: selectedCourse.niveis[level]?.blocos,
    });
  };

  useEffect(() => {
    IsMobile();
    updateLocalLevel(1);
    Object.keys(props.coursePlaying).length !== 0 &&
      setSelectedCourse(props.coursePlaying);
  }, []);

  useEffect(() => {
    if (currentLevel !== 0 && currentLevel <= selectedCourse.qtd_niveis) {
      updateLocalLevel(currentLevel);
    }
  }, [currentLevel]);

  return currentLevel === 0 ? (
    <Intro
      nome={selectedCourse.nome}
      introducao={selectedCourse.introducao}
      isMobile={isMobile}
      updateLevel={updateLevel}
    />
  ) : currentLevel > selectedCourse.qtd_niveis ? (
    <Ending isMobile={isMobile} updateLevel={updateLevel} />
  ) : (
    <Level
      isMobile={isMobile}
      level={currentLevelState}
      updateLevel={updateLevel}
    />
  );
};

export default Levels;
