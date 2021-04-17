import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Logo from "../Logo";
import Style from "./Navbar.module.scss";

const Navbar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Menu />
        <div className={Style.marca}>
          <Logo />
          <div className={Style.navbarTitle}>
            <Typography variant="h6" className={Style.title}>
              DJDCodE
            </Typography>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
