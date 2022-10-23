import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import services from "../../services";

const theme = createTheme();

function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    services.user.resetPass(
      { token: token, password: password, confirmPassword: confirmPassword },
      (rResponse) => {
        alert(rResponse.message);
        history.push("/login");
      },
      (rError) => {
        alert(rError.message);
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
            <Typography component="h1" variant="h5">
              Recuperação de senha
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <p style={{ margin: 0, textAlign: "center" }}>
                Insira uma nova senha:
              </p>
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

              <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirme a senha"
                type="password"
                id="confirmPassword"
              />

              <p style={{ color: "red", margin: 0, fontSize: 12 }}>
                {" "}
                {message.length > 0 && message}
              </p>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Enviar
              </Button>
              <Grid justifyContent="center" container>
                <Grid item>
                  <Link
                    style={{
                      color: "black",
                    }}
                    to="/login"
                  >
                    <Typography
                      color={"inherit"}
                      component={"p"}
                      variant="body2"
                    >
                      Voltar para o login
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

export default ResetPass;
