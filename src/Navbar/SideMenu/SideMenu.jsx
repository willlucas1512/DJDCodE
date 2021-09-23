import React from "react";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Style from "./SideMenu.module.scss";

const SideMenu = (props) => {
  const handleClick = (pText) => {
    props.handleClick(pText);
  };

  return (
    <div className={Style.root} role="presentation">
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
