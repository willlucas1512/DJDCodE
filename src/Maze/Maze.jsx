import React, { useEffect } from "react";
import BlocklyJS from "blockly/javascript";
import FancyMazeBuilder from "./FancyMazeBuilder";
import Mazing from "./Mazing";

function Maze(props) {
  useEffect(() => {
    var Maze, MazeGame;

    const makeMaze = (id, width, height, speech = false) => {
      Maze = new FancyMazeBuilder(width, height);
      Maze.display(id);
      MazeGame = new Mazing("maze");
      if (speech) {
        MazeGame.enableSpeech();
      }
      BlocklyJS["maze_walk_up"] = function () {
        MazeGame.walkUp();
      };

      BlocklyJS["maze_walk_down"] = function () {
        MazeGame.walkDown();
      };

      BlocklyJS["maze_walk_left"] = function () {
        MazeGame.walkLeft();
      };

      BlocklyJS["maze_walk_right"] = function () {
        MazeGame.walkRight();
      };
    };

    makeMaze("maze_container", 12, 12);
  }, []);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
