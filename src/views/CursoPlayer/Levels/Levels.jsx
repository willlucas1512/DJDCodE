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

  const generateLayout = () => {};

  const updateLocalLevel = (level) => {
    setCurrentLevelState({
      level: level,
      layout: layouts[level],
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
