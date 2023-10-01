import React, { useContext } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../Typography";
import NavbarContext from "../../../contexts/Navbar/NavbarContext";
import Style from "./Dados.module.scss";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function Dados() {
  const { updatePage } = useContext(NavbarContext);
  return (
    <Box
      component="section"
      sx={{
        // display: "flex",
        // overflow: "hidden",
        bgcolor: "rgba(45,191,165,255)",
      }}
    >
      <div className={Style.root}>
        <div className={Style.content}>
          <Grid my={4} container alignItems="center" spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <span className={Style.learnHome}></span>
                <span className={Style.spacer}></span>
                <Typography
                  style={{
                    textShadow: "1px 1px 1px black, 2px 2px 1px black",
                  }}
                  color={"textPrimary"}
                  variant="h5"
                  sx={{ my: 5 }}
                >
                  <b>Aprenda em casa!</b>
                </Typography>
                <span className={Style.spacer}></span>
                <Typography
                  style={{
                    textShadow: "1px 1px 1px black, 2px 2px 1px black",
                  }}
                  color={"textPrimary"}
                  align={"center"}
                  variant="body1"
                >
                  <b>
                    {"Aprenda a programar no conforto da sua casa,"}
                    {
                      " a partir de cursos criados por nós ou por seus professores."
                    }
                  </b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <span className={Style.brain}></span>
                <span className={Style.spacer}></span>
                <Typography
                  style={{
                    textShadow: "1px 1px 1px black, 2px 2px 1px black",
                  }}
                  color={"textPrimary"}
                  variant="h5"
                  sx={{ my: 5 }}
                >
                  <b>Crie o seu!</b>
                </Typography>
                <span className={Style.spacer}></span>
                <Typography
                  style={{
                    textShadow: "1px 1px 1px black, 2px 2px 1px black",
                  }}
                  color={"textPrimary"}
                  align={"center"}
                  variant="body1"
                >
                  <b>
                    {
                      "Tem muita criatividade guardada? Crie seu próprio curso de programação"
                    }

                    {" com o tema de labirinto!"}
                  </b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <span className={Style.documents}></span>
                <span className={Style.biggerSpacer}></span>
                <Typography
                  style={{
                    textShadow: "1px 1px 1px black, 2px 2px 1px black",
                  }}
                  color={"textPrimary"}
                  variant="h5"
                  sx={{ my: 5 }}
                >
                  <b>Crie uma conta!</b>
                </Typography>
                <span className={Style.spacer}></span>
                <Typography
                  style={{
                    textShadow: "1px 1px 1px black, 2px 2px 1px black",
                  }}
                  color={"textPrimary"}
                  align={"center"}
                  variant="body1"
                >
                  <b>
                    Para ter acesso ao conteúdo personalizado, crie uma conta ou
                    faça login.
                  </b>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
}

export default Dados;
