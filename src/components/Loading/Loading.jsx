import React from "react";
import loading from "./loading.svg";

const Loading = (props) => {
  return (
    <img
      width={props.width}
      height={props.height}
      src={loading}
      alt="Carregando..."
    />
  );
};

export default Loading;
