import React, { useEffect, useContext, useState, useRef } from "react";
import Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import FancyMazeBuilder from "./FancyMazeBuilder";
import Mazing from "./Mazing";
import CodeContext from "../../../../contexts/Code/CodeContext";
import NavbarContext from "../../../../contexts/Navbar/NavbarContext";

function Maze(props) {
  const { walk, updateMaze } = useContext(CodeContext);
  const { resetLevel } = useContext(NavbarContext);
  const counter = useRef(0);
  const [maze, setMaze] = useState();
  const executionTimer = useRef(null);
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

  function placeholder() {
    return "console.log(`walking`);";
  }

  const makeMaze = (id, layout, width, height) => {
    Maze = new FancyMazeBuilder(layout, width, height);
    Maze.display(id);
    MazeGame = new Mazing("maze");
    setMaze(MazeGame);
    updateMaze(MazeGame);
    BlocklyJS["maze_walk_up"] = () => placeholder();
    BlocklyJS["maze_walk_down"] = () => placeholder();
    BlocklyJS["maze_walk_left"] = () => placeholder();
    BlocklyJS["maze_walk_right"] = () => placeholder();
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

  const translateBlocksToKeywordArray = () => {
    // Lê os blocos que estão no canvas
    const xWorkspace = Blockly.Workspace.getAll()[0];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks(true);

    let xBlocks = []; // Armazena as keywords durante a leitura, para execução posterior
    let xRepetitions = 0;
    let xId = "";

    // "de para" dos nomes dos blocos do blockly com uma keyword do comportamento esperado
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
    return xBlocks;
  };

  const translateKeywordArrayToExecution = (pKeywordArray) => {
    const result = [];
    let repeatCount = 1;

    for (let i = 0; i < pKeywordArray.length; i++) {
      const instruction = pKeywordArray[i];

      if (
        instruction === "repeat" &&
        i + 1 < pKeywordArray.length &&
        !isNaN(pKeywordArray[i + 1])
      ) {
        repeatCount = parseInt(pKeywordArray[i + 1]);
        i++; // Skip the number after "repeat"
      } else if (instruction !== "fimdorepeat") {
        for (let j = 0; j < repeatCount; j++) {
          result.push(instruction);
        }
        repeatCount = 1;
      }
    }

    return result;
  };

  const runCode = () => {
    let xTypes = {
      controls_repeat_ext: "repeat",
      math_number: [0],
      maze_walk_up: "up",
      maze_walk_down: "down",
      maze_walk_left: "left",
      maze_walk_right: "right",
    };
    const xKeywordArray = translateBlocksToKeywordArray();
    const xExecutionArray = translateKeywordArrayToExecution(xKeywordArray);

    xExecutionArray.map((pMove, index) => {
      executionTimer.current = setTimeout(() => {
        const xWalkType = `maze_walk_${pMove}`;
        const moveLabel = xTypes[xWalkType];
        next[moveLabel](maze);
      }, 1000 * index);
    });
  };

  useEffect(() => {
    if (resetLevel && executionTimer.current) {
      clearTimeout(executionTimer.current);
    }
  }, [resetLevel]);

  useEffect(() => {
    makeMaze("maze_container", props.layout, props.width, props.height);
  }, [props.layout, props.width, props.height]);

  useEffect(() => {
    if (walk) {
      runCode();
    }
  }, [walk]);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
