import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Logo from "../Logo";
import Style from "./Navbar.module.scss";

const Navbar = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const IsMobile = () => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    IsMobile();
  }, []);

  if (isMobile) {
    return (
      <div className={Style.mobile}>
        <Menu />
      </div>
    );
  } else {
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
  }
};

export default Navbar;
