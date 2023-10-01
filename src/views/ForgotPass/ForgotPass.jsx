import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import services from "../../services";
import {
  DialogContent,
  IconButton,
  Grid,
  Box,
  Paper,
  Typography,
  DialogContentText,
  Dialog,
  DialogTitle,
  TextField,
  CssBaseline,
  Button,
} from "@mui/material";
import Success from "../../components/Success/Success";
import Error from "../../components/Error/Error";
import CloseIcon from "../../components/CloseIcon/CloseIcon";

const theme = createTheme();

function ForgotPass() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    services.user.recover(
      { email: username },
      (rResponse) => {
        setMessage(rResponse.message);
        setLoading(false);
        setOpen(true);
      },
      (rError) => {
        console.log(rError);
        setLoading(false);
        setOpen(true);
        setError(rError.data.message || "Erro!");
        setMessage(
          rError.data.message ||
            "Não foi possível recuperar sua senha. Tente novamente mais tarde."
        );
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
              Esqueci minha senha
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <p style={{ margin: 0, textAlign: "center" }}>
                Insira o seu e-mail cadastrado para receber as instruções e o
                link para criar uma nova senha.
              </p>
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

              <p style={{ color: "red", margin: 0, fontSize: 12 }}>
                {" "}
                {error.length > 0 && error}
              </p>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <Loading width={"30px"} height={"30px"} />
                ) : (
                  " Enviar"
                )}
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
          <DialogContentText>
            {message}
            <br />{" "}
            {error.length === 0 &&
              "Não se esqueça de verificar sua caixa de spam."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default ForgotPass;
