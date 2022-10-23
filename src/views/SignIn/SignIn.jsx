import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import locked from "./locked.png";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { acLogin } from "../../redux/actions";
import services from "../../services";

const theme = createTheme();

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    services.user.login(
      { email: username, password: password },
      (response) => {
        dispatch(acLogin(response));
        history.push("/home");
      },
      (error) => {
        if (error.status === 401) {
          setMessage("Email ou senha inválidos");
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/1600x900/?code)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={locked} />
            <div style={{ height: "12px" }}></div>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <p style={{ color: "red", margin: 0, fontSize: 12 }}>
                {" "}
                {message.length > 0 && message}
              </p>
              {/*<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembre de mim"
          />*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link style={{ color: "black" }} to="/recover">
                    <Typography
                      component={"p"}
                      color={"inherit"}
                      variant="body2"
                    >
                      Esqueceu a senha?
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    style={{
                      color: "black",
                    }}
                    to="/cadastro"
                  >
                    <Typography
                      color={"inherit"}
                      component={"p"}
                      variant="body2"
                    >
                      Não tem uma conta? Cadastre-se
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
