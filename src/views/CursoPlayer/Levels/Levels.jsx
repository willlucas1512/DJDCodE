import React, { useState, useEffect, useContext } from "react";
import Level from "./Level";
import Intro from "./Intro";
import Ending from "./Ending";
import LevelContext from "../../../contexts/Level/LevelContext";

const Levels = (props) => {
  const { colunas, linhas, niveis, nome, qtd_niveis, introducao } =
    props.coursePlaying;
  console.log(niveis);
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentLevelState, setCurrentLevelState] = useState({
    level: 0,
    layout: layouts[1],
    hint: "",
  });
  const { currentLevel, updateLevel } = useContext(LevelContext);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
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

  const generateLayout = (linhas, colunas, tilePositions) => {
    const grid = [];

    for (let y = 0; y < linhas; y++) {
      const linha = [];
      for (let x = 0; x < colunas; x++) {
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
      layout: generateLayout(linhas, colunas, niveis[level].tiles),
      hint: niveis[level].dica,
      blocos: niveis[level].blocos,
    });
  };

  useEffect(() => {
    IsMobile();
    updateLocalLevel(1);
  }, []);

  useEffect(() => {
    if (currentLevel !== 0) {
      updateLocalLevel(currentLevel);
    }
  }, [currentLevel]);

  return currentLevel === 0 ? (
    <Intro
      nome={nome}
      introducao={introducao}
      isMobile={isMobile}
      updateLevel={updateLevel}
    />
  ) : currentLevel === 6 ? (
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
