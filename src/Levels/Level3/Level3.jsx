import React, { useRef, useContext } from "react";
import Blockly from "blockly/core";
import { Block, Value, Field, Category } from "../../Blockly";
import BlocksArea from "../../BlocksArea";
import MapArea from "../../MapArea";
import Run from "../../Run";
import CodeContext from "../../Run/CodeContext";
import classNames from "classnames";
import Style from "./Level3.module.scss";

const Level3 = (props) => {
  const demoWorkspace = useRef();
  const { code } = useContext(CodeContext);
  const levelLayout = [
    [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], [], [], [], ["wall"]],
    [["wall"], ["wall"], ["door", "exit"], ["wall"], [], ["wall"]],
    [["wall"], ["wall"], ["wall"], ["wall"], ["key"], ["wall"]],
    [["wall"], ["entrance"], [], [], [], [], ["wall"]],
    [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
  ];
  const levelWidth = levelLayout[0].length;
  const levelHeight = levelLayout.length;
  Blockly.Blocks["maze_walk_up"] = {
    init: function () {
      this.appendDummyInput().appendField("andar pra cima");
      this.setColour(300);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("Andar pra cima.");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["maze_walk_down"] = {
    init: function () {
      this.appendDummyInput().appendField("andar pra baixo");
      this.setColour(300);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("Andar pra baixo.");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["maze_walk_left"] = {
    init: function () {
      this.appendDummyInput().appendField("andar pra esquerda");
      this.setColour(300);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("Andar pra esquerda.");
      this.setHelpUrl("");
    },
  };

  Blockly.Blocks["maze_walk_right"] = {
    init: function () {
      this.appendDummyInput().appendField("andar pra direita");
      this.setColour(300);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("Andar pra direita.");
      this.setHelpUrl("");
    },
  };

  const root = classNames(Style.root, {
    [Style.isMobile]: props.isMobile,
  });

  return (
    <div className={root}>
      <div className={Style.blockArea}>
        <BlocksArea ref={demoWorkspace}>
          <Category name="Labirinto" colour="120">
            <Block type="maze_walk_up"></Block>
            <Block type="maze_walk_right"></Block>
            <Block type="maze_walk_left"></Block>
            <Block type="maze_walk_down"></Block>
          </Category>
          <Category name="Loops" colour="120">
            <Block type="controls_repeat_ext"></Block>
          </Category>
          <Category name="Matemática" colour="230">
            <Block type="math_number"></Block>
          </Category>
        </BlocksArea>
      </div>
      <div className={Style.map}>
        <MapArea
          code={code}
          mazeProps={{
            layout: levelLayout,
            width: levelWidth,
            height: levelHeight,
          }}
        />
        <div className={Style.run}>
          <Run workspace={demoWorkspace} />
        </div>
      </div>
    </div>
  );
};

export default Level3;
