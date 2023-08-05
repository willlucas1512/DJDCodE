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

  const blocksLogicLevel1 = () => {
    console.log("blocksLogicLevel1");
    // const xWorkspace = Blockly.Workspace.getAll()[0];
    // // const code = BlocklyJS.workspaceToCode(xWorkspace.workspace);
    // const xBlocksOnWorkspace = xWorkspace.getAllBlocks();
    // const xTypes = {
    //   maze_walk_up: "up",
    //   maze_walk_down: "down",
    //   maze_walk_left: "left",
    //   maze_walk_right: "right",
    // };
    // let xBlocks = [];

    // xBlocksOnWorkspace.map((bloco, index) => {
    //   xBlocks.push(xTypes[bloco.type]);
    //   return 1;
    // });
    // console.log(xBlocks);
    // xBlocks.forEach((move, index) => {
    //   console.log(index, 1000 * index);
    //   return setTimeout(() => {
    //     // if (index !== 0) {
    //     //next[move](maze);
    //     //}
    //   }, 1000 * index);
    // });
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
    console.log(xBlocks);
    xBlocks.map((move, index) => {
      setTimeout(() => {
        if (index !== 0) {
          next[move](maze);
        }
      }, 1000 * index);
    });
  };

  const blocksLogicLevel4 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[9];
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks();

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
    // const xRepeatArray = Array(xTypes["math_number"]).fill().map(Math.random);
    // xRepeatArray.map((random, index) => {
    //   setTimeout(() => {
    //     if (index !== 0) {
    //       const xWalkType = `maze_walk_${xBlocks[2]}`;
    //       const moveLabel = xTypes[xWalkType];
    //       next[moveLabel](maze);
    //     }
    //   }, 1000 * index);
    // });
  };

  const blocksLogicLevel5 = () => {
    const xWorkspace = Blockly.Workspace.getAll()[12];
    console.log(Blockly.Workspace.getAll());
    const xBlocksOnWorkspace = xWorkspace.getAllBlocks();

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
        // const xBlcks = xBlocks;
        // const xSkcolb = xBlcks.reverse();
        // const xLastRepeatIndex = xSkcolb.indexOf("repeat");
        xTypes[bloco.type] = bloco.getFieldValue("NUM");
        // xBlocks.splice(xLastRepeatIndex + 1, 0, bloco.getFieldValue("NUM"));
      }
      //  else {
      xBlocks.push(xTypes[bloco.type]);
      // }
      return 1;
    });
    console.log(xBlocks);
    let xWeAreRepeting = [];
    xBlocks.map((pCommand, pIndex) => {
      if (pCommand === "repeat" || xWeAreRepeting.length === 1) {
        console.log("primeiro if");
        xWeAreRepeting.push(pCommand);
      } else if (xWeAreRepeting.length === 2) {
        console.log("segundo if");
        let xMove = "";
        let xRepetitions = 0;
        if (typeof pCommand === "number") {
          xMove = xWeAreRepeting[1];
          xRepetitions = pCommand;
        } else {
          xMove = pCommand;
          xRepetitions = xWeAreRepeting[1];
        }
        const xRepeatArray = Array(xRepetitions).fill().map(Math.random);
        xRepeatArray.map((random, index) => {
          console.log("repeticao", index);
          setTimeout(() => {
            // if (index !== 0) {
            const xWalkType = `maze_walk_${xMove}`;
            const moveLabel = xTypes[xWalkType];
            next[moveLabel](maze);
            // }
          }, 1000 * index);
        });
        xWeAreRepeting = [];
      } else {
        console.log("else");
        xWeAreRepeting = [];
        if (xBlocks.length > 1) {
          setTimeout(() => {
            const xWalkType = `maze_walk_${pCommand}`;
            const moveLabel = xTypes[xWalkType];
            next[moveLabel](maze);
          }, 1000);
        }
      }
    });
    // xBlocks.map((pCommand, pIndex) => {
    //   console.log(pCommand);
    //   setTimeout(() => {
    //     if (typeof pCommand === "number") {
    //       xRepetitions = pCommand;
    //     } else if (moves.includes(pCommand)) {
    //       if (xRepetitions !== 0) {
    //         const xRepeatArray = Array(xRepetitions).fill().map(Math.random);
    //         xRepeatArray.map((random, index) => {
    //           setTimeout(() => {
    //             // if (index !== 0) {
    //             const xWalkType = `maze_walk_${pCommand}`;
    //             const moveLabel = xTypes[xWalkType];
    //             next[moveLabel](maze);
    //             // }
    //           }, 1000 * index);
    //         });
    //         xRepetitions = 0;
    //       } else {
    //         xRepetitions = 0;
    //         setTimeout(() => {
    //           // if (index !== 0) {
    //           const xWalkType = `maze_walk_${pCommand}`;
    //           const moveLabel = xTypes[xWalkType];
    //           next[moveLabel](maze);
    //           // }
    //         }, 1000);
    //       }
    //     }
    //   }, 1000 * pIndex);
    // });
    // const xRepeatArray = Array(xTypes["math_number"]).fill().map(Math.random);
    // xRepeatArray.map((random, index) => {
    //   setTimeout(() => {
    //     if (index !== 0) {
    //       const xWalkType = `maze_walk_${xBlocks[2]}`;
    //       const moveLabel = xTypes[xWalkType];
    //       next[moveLabel](maze);
    //     }
    //   }, 1000 * index);
    // });
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

  // useEffect(() => {
  //   if (walk) {
  //     if (currentLevel === 1) {
  //       console.log("1");
  //       blocksLogicLevel1();
  //     } else if (currentLevel === 2) {
  //       console.log("2");
  //       blocksLogicLevel2();
  //     } else if (currentLevel === 3) {
  //       blocksLogicLevel3();
  //     } else if (currentLevel === 4) {
  //       blocksLogicLevel4();
  //     } else if (currentLevel === 5) {
  //       blocksLogicLevel5();
  //     }
  //   }
  // }, [walk]);

  return <div id="maze_container">{/**/}</div>;
}

export default Maze;
