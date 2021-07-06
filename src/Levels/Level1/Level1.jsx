import React, { useState, useContext } from "react";

import Blockly from "blockly/core";
import { Block, Category } from "../../Blockly";

import BlocksArea from "../../BlocksArea";
import MapArea from "../../MapArea";
import CodeContext from "../../Run/CodeContext";

import { Modal, Typography } from "@material-ui/core";
import classNames from "classnames";
import Style from "./Level1.module.scss";

const Level1 = (props) => {
  const { code } = useContext(CodeContext);
  const [showHint, setShowHint] = useState(true);
  const levelLayout = [
    [["wall"], ["wall"], ["wall"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["entrance"], ["wall"], ["wall"]],
    [["wall"], ["wall"], [], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["key"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["nubbin"], ["wall"], ["wall"]],
    [["wall"], ["wall"], ["door", "exit"], ["wall"], ["wall"]],
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
      this.appendDummyInput("andar pra direita").appendField(
        "andar pra direita"
      );
      this.setColour(300);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip("Andar pra direita.");
      // this.setHelpUrl("");
    },
  };

  const root = classNames(Style.root, {
    [Style.isMobile]: props.isMobile,
  });

  const category = classNames({
    [Style.categoryMobile]: props.isMobile,
  });

  const map = classNames({
    [Style.map]: !props.isMobile,
    [Style.mapMobile]: props.isMobile,
  });

  const blockArea = classNames({
    [Style.blockArea]: !props.isMobile,
    [Style.blockAreaMobile]: props.isMobile,
  });

  const handleClose = () => {
    setShowHint(false);
  };

  return (
    <>
      <Modal
        open={showHint}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div className={Style.modal}>
            <Typography id="simple-modal-description">
              Começando iniciante... como sair usando <b>4</b> blocos?
            </Typography>
          </div>
        }
      </Modal>
      <div className={root}>
        <div className={blockArea}>
          <BlocksArea>
            <Category css-container={category} name="Labirinto" colour="120">
              <Block type="maze_walk_up"></Block>
              <Block type="maze_walk_right"></Block>
              <Block type="maze_walk_left"></Block>
              <Block type="maze_walk_down"></Block>
            </Category>
          </BlocksArea>
        </div>
        <div className={map}>
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
    </>
  );
};

export default Level1;
