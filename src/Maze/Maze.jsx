import React, { useEffect, useContext, useState } from "react";
import Blockly from "blockly/core";
import BlocklyJS from "blockly/javascript";
import FancyMazeBuilder from "./FancyMazeBuilder";
import Mazing from "./Mazing";
import CodeContext from "../Run/CodeContext";

function Maze(props) {
  const { walk } = useContext(CodeContext);
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
      const xWorkspace = Blockly.Workspace.getAll()[0];
      // const code = BlocklyJS.workspaceToCode(xWorkspace.workspace);
      const xBlocksOnWorkspace = xWorkspace.getAllBlocks();
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
    }
  }, [walk]);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
