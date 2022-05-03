import * as Blockly from "blockly/core";
import "blockly/javascript";
import generator from ".";

Blockly.JavaScript["test_react_field"] = function (block) {
  return "console.log('custom block');\n";
};

Blockly.JavaScript["test_react_date_field"] = function (block) {
  return "console.log(" + block.getField("DATE").getText() + ");\n";
};

export default generator;
