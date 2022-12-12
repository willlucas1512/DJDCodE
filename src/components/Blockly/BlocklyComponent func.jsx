import React from "react";
import { useEffect, useRef } from "react";
import Style from "./BlocklyComponent.module.scss";
import Blockly from "blockly/core";
import locale from "blockly/msg/en";
import "blockly/blocks";

Blockly.setLocale(locale);

function BlocklyComponent(props) {
  const blocklyDiv = useRef();
  const toolbox = useRef();
  let primaryWorkspace = useRef();

  useEffect(() => {
    const { initialXml, children, ...rest } = props;
    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXml),
        primaryWorkspace.current
      );
    }
  }, [primaryWorkspace, toolbox, blocklyDiv, props]);

  return (
    <React.Fragment>
      <div className={Style.blocklyDiv} ref={blocklyDiv} id="blocklyDiv" />
      <div style={{ display: "none" }} ref={toolbox}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default BlocklyComponent;
