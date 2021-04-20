import React, { useRef } from "react";
import Blockly from "blockly/core";
import { Block, Value, Field, Category } from "../Blockly";
import BlocksArea from "../BlocksArea";
import MapArea from "../MapArea";
import Run from "../Run";

const BlocksLevel1 = (props) => {
  const demoWorkspace = useRef();
  Blockly.Blocks["lightswitch"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("pintar de")
        .appendField(
          new Blockly.FieldDropdown([["vermelho", "R"]]),
          "lightcolor"
        )
        .appendField(
          new Blockly.FieldDropdown([
            ["on", "on"],
            ["off", "off"],
          ]),
          "switch"
        );
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(330);
      this.setTooltip("");
      this.setHelpUrl("http//www.example.com/");
    },
  };
  //   const demoWorkspace = Blockly.inject("blocklyDiv", {
  //     media: "../../media/",
  //     toolbox: document.getElementById("toolbox"),
  //   });
  //   Blockly.Xml.domToWorkspace(
  //     document.getElementById("startBlocks"),
  //     demoWorkspace
  //   );

  return (
    <>
      <Run workspace={demoWorkspace} />
      <MapArea />
      <BlocksArea ref={demoWorkspace}>
        <Category name="Círculo">
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
    </>
  );
};

export default BlocksLevel1;
