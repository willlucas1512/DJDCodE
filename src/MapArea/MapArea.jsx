import React from "react";
import BlocklyJS from "blockly/javascript";
import Style from "./MapArea.module.scss";

const MapArea = (props) => {
  // ctrl-c ctrl-v do generator stub no blocky dev
  BlocklyJS["lightswitch"] = function (block) {
    // var dropdown_lightcolor = block.getFieldValue("lightcolor");
    var dropdown_switch = block.getFieldValue("switch");
    // adicionado manualmente
    if (dropdown_switch === "on") {
      var code =
        "document.getElementById('circle').style.backgroundColor='red';";
    }
    if (dropdown_switch === "off") {
      code = "document.getElementById('circle').style.backgroundColor='white';";
    }

    return code;
  };
  return <div className={Style.circle} id="circle"></div>;
};

export default MapArea;
