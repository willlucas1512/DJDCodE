import React, { useEffect, useContext, useState, useRef } from "react";
import Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import FancyMazeBuilder from "./FancyMazeBuilder";
import Mazing from "./Mazing";
import CodeContext from "../../../contexts/Code/CodeContext";
import LevelContext from "../../../contexts/Level/LevelContext";

function Maze(props) {
  const { walk, updateMaze } = useContext(CodeContext);
  const { currentLevel } = useContext(LevelContext);
  const counter = useRef(0);
  const [maze, setMaze] = useState();
  const next = {
    up: up,
    down: down,
    left: left,
    right: right,
  };

  var Maze, MazeGame;

  function up(pMaze) {
    pMaze.walkUp(counter.current);
    counter.current += 1;
    return "console.log(`walking up`);";
  }

  function down(pMaze) {
    pMaze.walkDown(counter.current);
    counter.current += 1;
    return "console.log(`walking down`);";
  }

  function left(pMaze) {
    pMaze.walkLeft(counter.current);
    counter.current += 1;
    return "console.log(`walking left`);";
  }

  function right(pMaze) {
    pMaze.walkRight(counter.current);
    counter.current += 1;
    return "console.log(`walking right`);";
  }

  const makeMaze = (id, layout, width, height, random) => {
    Maze = new FancyMazeBuilder(layout, width, height, random);
    Maze.display(id);
    MazeGame = new Mazing("maze");
    setMaze(MazeGame);
    updateMaze(MazeGame);
    BlocklyJS["maze_walk_up"] = () => up(MazeGame);
    BlocklyJS["maze_walk_down"] = () => down(MazeGame);
    BlocklyJS["maze_walk_left"] = () => left(MazeGame);
    BlocklyJS["maze_walk_right"] = () => right(MazeGame);
  };

  const blocksLogicLevel2 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[0];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks(true);
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

  const blocksLogicLevel4 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[0];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks(true);

    let xBlocks = [];
    let xRepetitions = 0;
    let moves = ["up", "down", "left", "right"];
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

    xBlocks.map((pCommand, pIndex) => {
      setTimeout(() => {
        if (typeof pCommand === "number") {
          xRepetitions = pCommand;
        } else if (moves.includes(pCommand)) {
          const xRepeatArray = Array(xRepetitions).fill().map(Math.random);
          xRepeatArray.map((random, index) => {
            setTimeout(() => {
              // if (index !== 0) {
              const xWalkType = `maze_walk_${pCommand}`;
              const moveLabel = xTypes[xWalkType];
              next[moveLabel](maze);
              // }
            }, 1000 * index);
          });
        }
      }, 1000 * pIndex);
    });
  };

  function findFirstBlockWithoutChildren(block) {
    if (block.type.includes("maze") && block.childBlocks_.length === 0) {
      return block;
    }

    for (const childBlock of block.childBlocks_) {
      const foundBlock = findFirstBlockWithoutChildren(childBlock);
      if (foundBlock) {
        return foundBlock;
      }
    }

    return null;
  }

  function multiplyArray(arr, times) {
    const result = [];
    for (let i = 0; i < times; i++) {
      result.push(...arr);
    }
    return result;
  }

  const blocksLogicLevel5 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[0];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks(true);
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
    let xId = "";
    xBlocksOnWorkspace.map((bloco, index) => {
      if (bloco.type === "math_number") {
        xTypes[bloco.type] = bloco.getFieldValue("NUM");
      } else if (bloco.type === "controls_repeat_ext") {
        const xFirstWalkBlockinRepeat = findFirstBlockWithoutChildren(bloco);
        xId = xFirstWalkBlockinRepeat.id;
      }
      xBlocks.push(xTypes[bloco.type]);
      if (xId === bloco.id) {
        xBlocks.push("fimdorepeat");
      }
      return 1;
    });
    console.log(xBlocks);
    if (xBlocks.includes("repeat")) {
      let xRepeatArray = [];
      xBlocks.map((pCommand, pIndex) => {
        if (pCommand === "repeat") {
          xRepeatArray = xBlocks.slice(
            pIndex + 2,
            xBlocks.findIndex((value) => value === "fimdorepeat")
          );
          const xRepeatedArray = multiplyArray(
            xRepeatArray,
            xBlocks[pIndex + 1]
          );
          xRepeatedArray.map((pMove, index) => {
            setTimeout(() => {
              const xWalkType = `maze_walk_${pMove}`;
              const moveLabel = xTypes[xWalkType];
              next[moveLabel](maze);
            }, 1000 * index);
          });
        }
      });
    }
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
    makeMaze(
      "maze_container",
      props.layout,
      props.width,
      props.height,
      props.random
    );
  }, [props.layout, props.width, props.height, props.random]);

  useEffect(() => {
    if (walk) {
      if (currentLevel === 2) {
        blocksLogicLevel2();
      } else if (currentLevel === 4) {
        blocksLogicLevel4();
      } else if (currentLevel === 5) {
        blocksLogicLevel5();
      }
    }
  }, [walk]);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
