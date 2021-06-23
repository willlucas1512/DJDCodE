import React, { useEffect, useContext, useState } from "react";
import Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import FancyMazeBuilder from "./FancyMazeBuilder";
import Mazing from "./Mazing";
import CodeContext from "../Run/CodeContext";
import LevelContext from "../Levels/LevelContext";

function Maze(props) {
  const { walk } = useContext(CodeContext);
  const { currentLevel } = useContext(LevelContext);
  const [maze, setMaze] = useState();
  const next = {
    up: up,
    down: down,
    left: left,
    right: right,
  };

  var Maze, MazeGame;

  function up(pMaze) {
    pMaze.walkUp();
  }

  function down(pMaze) {
    pMaze.walkDown();
  }

  function left(pMaze) {
    pMaze.walkLeft();
  }

  function right(pMaze) {
    pMaze.walkRight();
  }

  const makeMaze = (id, layout, width, height, random, speech = false) => {
    Maze = new FancyMazeBuilder(layout, width, height, random);
    Maze.display(id);
    MazeGame = new Mazing("maze");
    setMaze(MazeGame);
    // if (speech) {
    //   MazeGame.enableSpeech();
    // }

    BlocklyJS["maze_walk_up"] = () => up(MazeGame);
    // BlocklyJS["maze_walk_up"] = function up(pNext) {
    //   MazeGame.walkUp();
    // };
    BlocklyJS["maze_walk_down"] = () => down(MazeGame);
    // function down(pNext) {
    //   MazeGame.walkDown();
    // };
    BlocklyJS["maze_walk_left"] = () => left(MazeGame);
    // function left(pNext) {
    //   MazeGame.walkLeft();
    // };
    BlocklyJS["maze_walk_right"] = () => right(MazeGame);
    // function right(pNext) {
    //   MazeGame.walkRight();
    // };
  };

  const blocksLogicLevel1 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[0];
    // const code = BlocklyJS.workspaceToCode(xWorkspace.workspace);
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks();
    console.log(Blockly.Workspace.getAll());
    const xTypes = {
      maze_walk_up: "up",
      maze_walk_down: "down",
      maze_walk_left: "left",
      maze_walk_right: "right",
    };
    let xBlocks = [];

    xBlocksOnWorkspace.map((bloco, index) => {
      xBlocks.push(xTypes[bloco.type]);
      return 1;
    });

    xBlocks.map((move, index) => {
      setTimeout(() => {
        if (index !== 0) {
          next[move](maze);
        }
      }, 1000 * index);
    });
  };

  const blocksLogicLevel2 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[3];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks();

    let xBlocks = [];
    let xRepetitions = 0;
    let xTypes = {
      controls_repeat_ext: "repeat",
      math_number: [xRepetitions],
      maze_walk_up: "up",
      maze_walk_down: "down",
      maze_walk_left: "left",
      maze_walk_right: "right",
    };

    xBlocksOnWorkspace.map((bloco, index) => {
      if (bloco.type === "math_number") {
        xTypes[bloco.type] = bloco.getFieldValue("NUM");
      }
      xBlocks.push(xTypes[bloco.type]);
      return 1;
    });

    const xRepeatArray = Array(xTypes["math_number"]).fill().map(Math.random);
    xRepeatArray.map((random, index) => {
      setTimeout(() => {
        if (index !== 0) {
          const xWalkType = `maze_walk_${xBlocks[2]}`;
          const moveLabel = xTypes[xWalkType];
          next[moveLabel](maze);
        }
      }, 1000 * index);
    });
  };

  const blocksLogicLevel3 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[6];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks();

    let xBlocks = [];
    let xRepetitions = 0;
    let xTypes = {
      controls_repeat_ext: "repeat",
      math_number: [xRepetitions],
      maze_walk_up: "up",
      maze_walk_down: "down",
      maze_walk_left: "left",
      maze_walk_right: "right",
    };

    xBlocksOnWorkspace.map((bloco, index) => {
      if (bloco.type === "math_number") {
        xTypes[bloco.type] = bloco.getFieldValue("NUM");
      }
      xBlocks.push(xTypes[bloco.type]);
      return 1;
    });

    const xRepeatArray = Array(xTypes["math_number"]).fill().map(Math.random);
    xRepeatArray.map((random, index) => {
      setTimeout(() => {
        if (index !== 0) {
          const xWalkType = `maze_walk_${xBlocks[2]}`;
          const moveLabel = xTypes[xWalkType];
          next[moveLabel](maze);
        }
      }, 1000 * index);
    });
  };

  useEffect(() => {
    makeMaze(
      "maze_container",
      props.layout,
      props.width,
      props.height,
      props.random
    );
  }, []);

  useEffect(() => {
    if (walk) {
      if (currentLevel === 1) {
        blocksLogicLevel1();
      } else if (currentLevel === 2) {
        blocksLogicLevel2();
      } else if (currentLevel === 3) {
        blocksLogicLevel3();
      }
    }
  }, [walk]);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
