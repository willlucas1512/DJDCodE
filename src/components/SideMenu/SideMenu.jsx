import React from "react";
import { Link } from "react-router-dom";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MenuBookIcon from "@material-ui/icons/MenuBook";
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

  return (
    <div className={classes.root} role="presentation">
      <List>
        {[
          { text: "Home", path: "home" },
          { text: "Labirinto", path: "labirinto" },
          { text: "Curso Maker", path: "cursomaker" },
        ].map((item, index) => (
          <Link key={index} to={`/${item.path}`}>
            <ListItem onClick={() => handleClick(item.text)} button>
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <SchoolIcon />
                ) : index === 2 ? (
                  <BorderColorIcon />
                ) : (
                  <MenuBookIcon />
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
