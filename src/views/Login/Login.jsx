import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
import locked from "./locked.png";
import CloseIcon from "../../components/CloseIcon/CloseIcon";
import Error from "../../components/Error/Error";
import Success from "../../components/Success/Success";
import Loading from "../../components/Loading";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { acLogin } from "../../redux/actions";
import services from "../../services";

const theme = createTheme();

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    services.user.login(
      { email: username, password: password },
      (rResponse) => {
        dispatch(acLogin(rResponse));
        setLoading(false);
        setOpen(true);
        setDisabledButton(true);
        history.push("/home");
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
                {error.length > 0 && error}
              </p>
              {/*<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lembre de mim"
          />*/}
              <Button
                disabled={disabledButton}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <Loading width={"30px"} height={"30px"} /> : "Login"}
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
        {error.length > 0 ? <Error /> : <Success />}

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

export default Login;
