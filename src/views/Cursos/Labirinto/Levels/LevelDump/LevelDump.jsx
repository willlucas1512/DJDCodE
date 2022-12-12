import React, { useContext } from "react";
import Blockly from "blockly/core";
import { Block, Value, Field, Category } from "../../Blockly";
import BlocksArea from "../../BlocksArea";
import MapArea from "../../MapArea";
import CodeContext from "../../Run/CodeContext";
import classNames from "classnames";
import Style from "./LevelDump.module.scss";

const LevelDump = (props) => {
  const { code } = useContext(CodeContext);
  const levelLayout = [
    [["wall"], ["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["entrance"], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], [], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["key"], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["nubbin"], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["door", "exit"], ["wall"], ["wall"], ["wall"]],
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
        <BlocksArea>
          <Category name="Labirinto" colour="120">
            <Block type="maze_walk_up"></Block>
            <Block type="maze_walk_right"></Block>
            <Block type="maze_walk_left"></Block>
            <Block type="maze_walk_down"></Block>
          </Category>
          <Category name="Variáveis" custom="VARIABLE" colour="330"></Category>
          <Category name="Funções" custom="PROCEDURE" colour="330"></Category>
          <Category name="Lógica" colour="210">
            <Block type="controls_if"></Block>
            <Block type="logic_compare"></Block>
            <Block type="logic_operation"></Block>
            <Block type="logic_boolean"></Block>
          </Category>
          <Category name="Loops" colour="120">
            <Block type="controls_whileUntil"></Block>
            <Block type="controls_repeat_ext"></Block>
            <Block type="controls_for"></Block>
          </Category>
          <Category name="Matemática" colour="230">
            <Block type="math_number"></Block>
            <Block type="math_arithmetic"></Block>
          </Category>
          <Category name="Texto" colour="150">
            <Block type="text"></Block>
            <Block type="text_print"></Block>
          </Category>
          <Category name="Eletricidade" colour="300">
            <Block type="power_type"></Block>
          </Category>
          <Category name="Conversões" colour="360">
            <Block type="f_to_c"></Block>
          </Category>
          <Category colour="210" name="Pintar">
            <Block type="lightswitch">
              <Value name="VALUE">
                <Block type="variables_get">
                  <Field name="lightcolor">red</Field>
                  <Field name="switch">on</Field>
                </Block>
              </Value>
            </Block>
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
      </div>
    </div>
  );
};

export default LevelDump;
