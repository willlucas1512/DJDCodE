import React from "react";
import { Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import Style from "./LevelSelector.module.scss";

const LevelSelector = (props) => {
  return (
    <div className={Style.root}>
      <Typography variant={"h6"}>Níveis</Typography>
      {[...Array(props.levels).keys()].map((level) => {
        return (
          <>
            <Button
              onClick={() => props.setSelectedLevel(level + 1)}
              variant={
                props.selectedLevel === level + 1 ? "contained" : "outlined"
              }
              color={"primary"}
            >
              Nível {level + 1}
            </Button>
            <div className={Style.verticalSpacer}></div>
          </>
        );
      })}
    </div>
  );
};

LevelSelector.propTypes = {
  levels: PropTypes.number,
  selectedLevel: PropTypes.number,
};

export default LevelSelector;
