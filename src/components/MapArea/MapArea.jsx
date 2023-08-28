import React from "react";
import Style from "./MapArea.module.scss";
import Maze from "../../views/Labirinto/Maze";

const MapArea = (props) => {
  return (
    <div className={Style.mapContour} id="mapContour">
      <Maze
        layout={props.mazeProps.layout}
        width={props.mazeProps.width}
        height={props.mazeProps.height}
        random={props.mazeProps.random}
      />
    </div>
  );
};

export default MapArea;
