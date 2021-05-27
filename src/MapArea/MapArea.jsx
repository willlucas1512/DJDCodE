import React from "react";
import BlocklyJS from "blockly/javascript";
import Style from "./MapArea.module.scss";
import Maze from "../Maze";
import Mazing from "../Maze/Mazing";

const MapArea = (props) => {
  // ctrl-c ctrl-v do generator stub no blocky dev
  BlocklyJS["lightswitch"] = function (block) {
    // var dropdown_lightcolor = block.getFieldValue("lightcolor");
    var dropdown_switch = block.getFieldValue("switch");
    // adicionado manualmente
    if (dropdown_switch === "on") {
      var code =
        "document.getElementById('mapContour').style.backgroundColor='red';";
    }
    if (dropdown_switch === "off") {
      code =
        "document.getElementById('mapContour').style.backgroundColor='white';";
    }

    return code;
  };

  return (
    <div className={Style.mapContour} id="mapContour">
      <Maze />
      {/* <Typography variant="h6" color="primary">
        {props.code}
      </Typography> */}
    </div>
  );
};

export default MapArea;
