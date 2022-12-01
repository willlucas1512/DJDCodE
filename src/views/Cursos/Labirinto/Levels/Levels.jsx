import React, { useState, useEffect, useContext } from "react";
import Level from "./Level";
import Intro from "./Intro";
import Ending from "./Ending";
import LevelContext from "./LevelContext";

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

  const hints = [
    "",
    "Começando iniciante... como sair usando 4 blocos?",
    "Agora faça a mesma coisa usando 3 blocos. A distância continua sendo 4.",
    "Encontrei um rascunho com 3D 3C 2E 1B escrito. Você sabe o que significa?",
    "Agora que descobriu o que é, faça o mesmo com 3 blocos.",
    "Eu estava brincando com você. O teste real vem agora. Quero ver você sair dessa.",
  ];

  const updateLocalLevel = (level) => {
    setCurrentLevelState({
      level: level,
      layout: layouts[level],
      hint: hints[level],
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
    <Intro isMobile={isMobile} updateLevel={updateLevel} />
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
