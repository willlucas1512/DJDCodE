import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import CloseIcon from "../../components/CloseIcon/CloseIcon";
import Error from "../../components/Error/Error";
import Success from "../../components/Success/Success";
import Loading from "../../components/Loading";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import services from "../../services";

const theme = createTheme();

function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const history = useHistory();
  const { token } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    services.user.resetPass(
      { token: token, password: password, confirmPassword: confirmPassword },
      (rResponse) => {
        setLoading(false);
        setMessage(rResponse.message);
        setOpen(true);
        setDisabledButton(true);
        setTimeout(() => history.push("/login"), 5000);
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
                disabled={disabledButton}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <Loading width={"30px"} height={"30px"} />
                ) : (
                  "Enviar"
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
            {message} <br />
            {error.length === 0 &&
              "Você será redirecionado para a página de login."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default ResetPass;
