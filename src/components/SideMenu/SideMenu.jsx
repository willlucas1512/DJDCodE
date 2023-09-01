import React from "react";
import { Link } from "react-router-dom";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SearchIcon from "@material-ui/icons/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import Style from "./SideMenu.module.scss";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#212427",
    width: "100%",
    height: "100%",
    padding: "12px",
  },
});

const SideMenu = (props) => {
  const classes = useStyles();
  const handleClick = (pText) => {
    props.handleClick(pText);
  };

  const xMenu = localStorage.getItem("user")
    ? [
        { text: "Home", path: "home" },
        { text: "Labirinto", path: "labirinto" },
        { text: "Curso Maker", path: "cursomaker" },
        { text: "Explorar cursos", path: "cursos" },
        { text: "Meus cursos", path: "perfil" },
        { text: "Sair", path: "home" },
      ]
    : [
        { text: "Home", path: "home" },
        { text: "Labirinto", path: "labirinto" },
        { text: "Explorar cursos", path: "cursos" },
        { text: "Login", path: "login" },
      ];

  return (
    <div className={classes.root} role="presentation">
      <List>
        {xMenu.map((item, index) => (
          <Link key={index} to={`/${item.path}`}>
            <ListItem onClick={() => handleClick(item.text)} button>
              <ListItemIcon>
                {item.text === "Login" ? (
                  <LoginIcon />
                ) : index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <SchoolIcon />
                ) : index === 2 ? (
                  <BorderColorIcon />
                ) : index === 3 ? (
                  <SearchIcon />
                ) : index === 4 ? (
                  <MenuBookIcon />
                ) : (
                  <LogoutIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default SideMenu;
