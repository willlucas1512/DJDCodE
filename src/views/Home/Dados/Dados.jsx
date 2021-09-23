import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "../Typography";
import Style from "./Dados.module.scss";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

function Dados() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "lightGrey" }}
    >
      <Container sx={{ mt: 10, mb: 15, display: "flex", position: "relative" }}>
        <Box
          component="img"
          //   src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="../work-from-home.png"
                // alt="suitcase"
                sx={{ height: 55 }}
              /> */}
              <span className={Style.learnHome}></span>
              <span className={Style.spacer}></span>
              <Typography variant="h5" sx={{ my: 5 }}>
                Aprenda em casa
              </Typography>
              <span className={Style.spacer}></span>
              <Typography align={"center"} variant="h6">
                {"Aprenda a programar no conforto da sua casa,"}

                {"a partir de cursos criados por nós ou por seus professores."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="/static/themes/onepirate/productValues2.svg"
                alt="graph"
                sx={{ height: 55 }}
              /> */}
              <span className={Style.brain}></span>
              <span className={Style.spacer}></span>
              <Typography variant="h5" sx={{ my: 5 }}>
                Crie o seu!
              </Typography>
              <span className={Style.spacer}></span>

              <Typography align={"center"} variant="h6">
                {
                  "Tem muita criatividade guardada? Crie seu próprio curso de programação"
                }

                {" com o tema de labirinto!"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              {/* <Box
                component="img"
                src="/static/themes/onepirate/productValues3.svg"
                alt="clock"
                sx={{ height: 55 }}
              /> */}
              <span className={Style.documents}></span>
              <span className={Style.biggerSpacer}></span>
              <Typography variant="h5" sx={{ my: 5 }}>
                Material de apoio
              </Typography>
              <span className={Style.spacer}></span>
              <Typography align={"center"} variant="h6">
                {"Precisa de conteúdo explicativo ou quer se aprofundar mais?"}

                {" Clique aqui para dar uma olhada."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dados;
