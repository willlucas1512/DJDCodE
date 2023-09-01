import React, { useState, useContext, useEffect } from "react";

import Blockly from "blockly/core";
import {
  Block,
  Category,
  Field,
  Shadow,
  Value,
} from "../../../../components/Blockly";

import { BlocksArea } from "../../../../components";
import MapArea from "../../MapArea";
import CodeContext from "../../../../contexts/Code/CodeContext";
import LevelContext from "../../../../contexts/Level/LevelContext";
import { Modal, Typography } from "@material-ui/core";
import classNames from "classnames";
import Style from "./Level.module.scss";

const Level = (props) => {
  const { code } = useContext(CodeContext);
  const { showHintLevel, updateHintLevel } = useContext(LevelContext);
  const [showHint, setShowHint] = useState(true);
  const levelLayout = props.level.layout;
  const levelBlocks = props.level.blocos;

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
    updateHintLevel(0);
  };

  useEffect(() => {
    if (showHintLevel === props.level.level) {
      setShowHint(true);
    }
  }, [showHintLevel]);

  useEffect(() => {
    setShowHint(true);
  }, [props.level]);

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
              {props.level.hint}
            </Typography>
          </div>
        }
      </Modal>
      <div className={root}>
        <div className={blockArea}>
          <BlocksArea>
            <Category css-container={category} name="Labirinto" colour="120">
              {levelBlocks.map((bloco) => {
                if (bloco.alt === "Bloco andar pra baixo") {
                  return <Block type="maze_walk_down"></Block>;
                } else if (bloco.alt === "Bloco andar pra cima") {
                  return <Block type="maze_walk_up"></Block>;
                } else if (bloco.alt === "Bloco andar pra direita") {
                  return <Block type="maze_walk_right"></Block>;
                } else if (bloco.alt === "Bloco andar pra esquerda") {
                  return <Block type="maze_walk_left"></Block>;
                }
              })}
            </Category>
            <Category name="Repetições" colour="230">
              {levelBlocks.map((bloco) => {
                if (bloco.alt === "Bloco repeatxtimes") {
                  return (
                    <Block type="controls_repeat_ext">
                      <Value name="TIMES">
                        <Shadow type="math_number">
                          <Field name="NUM">0</Field>
                        </Shadow>
                      </Value>
                    </Block>
                  );
                }
              })}
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

export default Level;
