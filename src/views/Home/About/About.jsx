import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import logo from "./logodjde.png";
import youtube from "./youtube.png";
import instagram from "./instagram.png";
import ufrj from "./ufrjlogo.png";
import gmail from "./gmail.png";
import whatsapp from "./whatsapp.png";
import Style from "./About.module.scss";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const About = (props) => {
  const ua = navigator.userAgent.toLowerCase();

  const isMobile = ua.indexOf("mobile") > -1;
  let href = "";

  if (isMobile) {
    href = "whatsapp://send?phone=+5521971727761";
  } else {
    href = "https://web.whatsapp.com/send?phone=+5521971727761";
  }
  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          overflow: "hidden",
          bgcolor: "rgba(45,191,165,255)",
        }}
      >
        <div className={Style.root}>
          <Container
            sx={{ mt: 5, mb: 10, display: "flex", position: "relative" }}
          >
            <div className={Style.content}>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box sx={item}>
                    <div className={Style.vSpacer}></div>
                    <Typography
                      color={"textPrimary"}
                      align={"center"}
                      variant={"h6"}
                      sx={{ my: 5 }}
                    >
                      Quem somos
                    </Typography>
                    <div className={Style.vSpacer}></div>
                    <a href={"https://www.jogosdigitais.cap.ufrj.br/"}>
                      <div className={Style.links}>
                        <img
                          src={logo}
                          style={{ width: "128px", height: "128px" }}
                        />
                        <div className={Style.vSpacer}></div>
                        <div className={Style.linkText}>
                          <Typography color={"textPrimary"} align={"center"}>
                            <b>
                              Desenvolvimento de Jogos Digitais para a Educação
                            </b>
                          </Typography>
                        </div>
                      </div>
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={item}>
                    <div className={Style.vSpacer}></div>
                    <Typography
                      color={"textPrimary"}
                      align={"center"}
                      variant={"h6"}
                      sx={{ my: 5 }}
                    >
                      Apoio
                    </Typography>
                    <div className={Style.vSpacer}></div>
                    <img
                      src={ufrj}
                      style={{ width: "200px", height: "200px" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={item}>
                    <div className={Style.vSpacer}></div>
                    <Typography
                      color={"textPrimary"}
                      align={"center"}
                      variant={"h6"}
                      sx={{ my: 5 }}
                    >
                      Contato
                    </Typography>
                    <div className={Style.vSpacer}></div>
                    <a href={"mailto:extensaodjde@gmail.com"}>
                      <div className={Style.linkTextYt}>
                        <img
                          src={gmail}
                          style={{ width: "32px", height: "32px" }}
                        />{" "}
                        <div className={Style.hSpacer}></div>
                        <Typography color={"textPrimary"} variant={"body2"}>
                          <b>Enviar email</b>
                        </Typography>
                      </div>
                    </a>
                    <div className={Style.vSpacer}></div>

                    <a href={href}>
                      <div className={Style.linkTextYt}>
                        <img
                          src={whatsapp}
                          style={{ width: "32px", height: "32px" }}
                        />{" "}
                        <div className={Style.hSpacer}></div>
                        <Typography color={"textPrimary"} variant={"body2"}>
                          <b>Enviar Whatsapp</b>
                        </Typography>
                      </div>
                    </a>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={item}>
                    <div className={Style.vSpacer}></div>
                    <Typography
                      color={"textPrimary"}
                      align={"center"}
                      variant={"h6"}
                      sx={{ my: 5 }}
                    >
                      Redes Sociais
                    </Typography>
                    <div className={Style.vSpacer}></div>
                    <div className={Style.socials}>
                      <a
                        href={
                          "https://www.youtube.com/channel/UCm7s078iyiWJXFlHn4ExI1A"
                        }
                      >
                        <div className={Style.linkTextYt}>
                          <img
                            src={youtube}
                            style={{ width: "32px", height: "32px" }}
                          />
                          <div className={Style.hSpacer}></div>
                          <Typography color={"textPrimary"} variant={"body2"}>
                            <b>Projeto DJDE UFRJ</b>
                          </Typography>
                        </div>
                      </a>

                      <div className={Style.vSpacer}></div>
                      <a
                        href={
                          "https://www.instagram.com/professorfernandovillar/"
                        }
                      >
                        <div className={Style.linkTextYt}>
                          <img
                            src={instagram}
                            style={{ width: "32px", height: "32px" }}
                          />
                          <div className={Style.hSpacer}></div>
                          <Typography color={"textPrimary"} variant={"body2"}>
                            <b>Professor Fernando Villar </b>
                          </Typography>
                        </div>
                      </a>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </Box>
    </>
  );
};

export default About;
