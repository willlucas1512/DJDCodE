import React from "react";
import { ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
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
          "Home",
          "Cursos",
          "Curso Maker",
          "Material de apoio",
          "Referências",
        ].map((text, index) => (
          <ListItem onClick={() => handleClick(text)} button key={text}>
            <ListItemIcon>
              {index === 0 ? (
                <HomeIcon />
              ) : index === 1 ? (
                <SchoolIcon />
              ) : index === 2 ? (
                <BorderColorIcon />
              ) : index === 3 ? (
                <MenuBookIcon />
              ) : (
                <LibraryBooksIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideMenu;
