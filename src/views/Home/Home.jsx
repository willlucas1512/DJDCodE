import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "./Button";
import Typography from "./Typography";
import ApresentacaoLayout from "./ApresentacaoLayout";
import Style from "./Home.module.scss";
import Dados from "./Dados/Dados";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  background: {
    backgroundImage: `url(../bg.jpeg)`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center",
  },
  button: {
    minWidth: 300,
    marginRight: "16px",
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

const Home = (props) => {
  const { classes } = props;

  return (
    <div className={Style.root}>
      <div className={Style.fade}>
        <ApresentacaoLayout backgroundClassName={classes.background}>
          <Typography
            color="inherit"
            align="center"
            variant="h2"
            marked="center"
          >
            Aprenda a programar
          </Typography>
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            className={classes.h5}
          >
            Mude o mundo.
          </Typography>
          <div display={"flex"}>
            <Link to={`/labirinto`}>
              <Button
                color="primary"
                variant="contained"
                size="large"
                className={classes.button}
              >
                Quero aprender
              </Button>
            </Link>
            <Link to={`/cursomaker`}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
              >
                Quero ensinar
              </Button>
            </Link>
          </div>
        </ApresentacaoLayout>
        <Dados />
        {/* <About /> */}
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
