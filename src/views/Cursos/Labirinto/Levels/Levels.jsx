import React, { useState, useEffect, useContext } from "react";
import Level from "./Level";
import Intro from "./Intro";
import Ending from "./Ending";
import LevelContext from "./LevelContext";

const Levels = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentLevelState, setCurrentLevelState] = useState({
    level: 0,
    layout: [[]],
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

  const hints = [
    "",
    "Come??ando iniciante... como sair usando 4 blocos?",
    "Agora fa??a a mesma coisa usando 3 blocos. A dist??ncia continua sendo 4.",
    "Encontrei um rascunho com 3D 3C 2E 1B escrito. Voc?? sabe o que significa?",
    "Agora que descobriu o que ??, fa??a o mesmo com 3 blocos.",
    "Eu estava brincando com voc??. O teste real vem agora. Quero ver voc?? sair dessa.",
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
  }, []);

  useEffect(() => {
    updateLocalLevel(currentLevel);
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
