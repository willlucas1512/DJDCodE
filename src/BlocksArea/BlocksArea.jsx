import React from "react";
import BlocklyComponent from "../Blockly";
import PropTypes from "prop-types";

const BlocksArea = (props) => {
  return (
    <BlocklyComponent
      ref={props.ref}
      readOnly={false}
      trashcan={true}
      media={"media/"}
      move={{
        scrollbars: true,
        drag: true,
        wheel: true,
      }}
      initialXml={`
    <xml xmlns="http://www.w3.org/1999/xhtml">
    <block type="controls_ifelse" x="0" y="0"></block>
    </xml>
          `}
    >
      {props.children}
    </BlocklyComponent>
  );
};

BlocksArea.propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default BlocksArea;
