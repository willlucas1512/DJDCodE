import React from "react";
import classNames from "classnames";
import { Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import MobileNavbar from "../../../MobileNavbar/MobileNavbar";
import Style from "./LevelSelector.module.scss";

const LevelSelector = (props) => {
  return (
    <div className={Style.root}>
      <div className={Style.menu}>
        <MobileNavbar />
      </div>
      <Typography color={"textPrimary"} variant={"h5"}>
        <b>Níveis</b>
      </Typography>
      <div className={Style.biggerHorizontalSpacer}></div>
      {[...Array(props.levels).keys()].map((level, index) => {
        const spanClass = classNames(Style.span, {
          [Style.nonClick]: level + 1 !== props.selectedLevel,
          [Style.click]: level + 1 === props.selectedLevel,
        });
        return (
          <div className={Style.button} key={index}>
            <Button
              style={{
                borderRadius: "50%",
                minWidth: 16,
                minHeigth: 16,
                background: "hsl(340deg 100% 32%)",
                border: "none",
                padding: 0,
                outlineOffset: "4px",
              }}
              onClick={() => props.setSelectedLevel(level + 1)}
              variant={
                props.selectedLevel === level + 1 ? "contained" : "outlined"
              }
              color={"secondary"}
            >
              <span className={spanClass}>{level + 1}</span>
            </Button>
          </div>
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
