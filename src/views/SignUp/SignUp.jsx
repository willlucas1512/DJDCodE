import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  CssBaseline,
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import locked from "../Login/locked.png";
import CloseIcon from "../../components/CloseIcon/CloseIcon";
import Error from "../../components/Error/Error";
import Success from "../../components/Success/Success";
import Loading from "../../components/Loading";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import services from "../../services";

const theme = createTheme();

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    services.user.register(
      {
        email: username,
        password: password,
        name_first: firstName,
        name_last: lastName,
      },
      (rResponse) => {
        setLoading(false);
        setMessage(rResponse.message);
        setOpen(true);
        setDisabledButton(true);
        setTimeout(() => history.push("/home"), 5000);
      },
      (rError) => {
        setOpen(true);
        setLoading(false);
        setError(rError.data.message);
        setMessage(rError.data.message);
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
              Cadastro
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Primeiro Nome"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    fullWidth
                    id="lastName"
                    label="Sobrenome"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <p style={{ color: "red", margin: 0, fontSize: 12 }}>
                {" "}
                {error.length > 0 && error}{" "}
              </p>
              <Button
                disabled={disabledButton}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <Loading width={"30px"} height={"30px"} />
                ) : (
                  "Cadastrar"
                )}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ color: "black" }}>
                    <Typography
                      color={"inherit"}
                      component={"p"}
                      variant="body2"
                    >
                      Já tem uma conta? Faça login
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        sx={{ padding: "16px", display: "flex", justifyContent: "center" }}
        onClose={handleClose}
        open={open}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {error.length > 0 ? <Error /> : <Success />}
        </Box>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "center", padding: 0 }}
        >
          {error.length > 0 ? "Erro" : "Sucesso"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default SignUp;
