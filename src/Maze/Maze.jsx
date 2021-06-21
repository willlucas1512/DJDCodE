import React, { useEffect } from "react";
import BlocklyJS from "blockly/javascript";
import FancyMazeBuilder from "./FancyMazeBuilder";
import Mazing from "./Mazing";

function Maze(props) {
  useEffect(() => {
    var Maze, MazeGame;

    const makeMaze = (id, layout, width, height, random, speech = false) => {
      Maze = new FancyMazeBuilder(layout, width, height, random);
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

    makeMaze(
      "maze_container",
      props.layout,
      props.width,
      props.height,
      props.random
    );
  }, []);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
