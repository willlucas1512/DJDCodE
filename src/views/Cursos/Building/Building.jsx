import React from "react";
import construction from "./under-construction.png";
import Typography from "@material-ui/core/Typography";

const Building = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img height="100px" width="100px" src={construction} />

        <div
          style={{
            marginTop: "32px",
            width: "250px",
          }}
        >
          <div
            style={{
              marginBottom: "8px",
            }}
          >
            <Typography variant={"h6"} align={"center"}>
              <b> Curso em construção </b>
            </Typography>
          </div>
          <Typography variant={"body1"} align={"center"}>
            Ainda estamos fazendo esse, tente outros!
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Building;
