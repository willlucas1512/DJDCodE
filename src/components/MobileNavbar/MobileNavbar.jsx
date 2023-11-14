import React, { useState, useContext, useEffect } from "react";
import { IconButton, Drawer, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Style from "./MobileNavbar.module.scss";
import NavbarContext from "../../contexts/Navbar/NavbarContext";
import SideMenu from "../SideMenu";
import Logo from "../Logo";

const MobileNavbar = (props) => {
  const { updatePage } = useContext(NavbarContext);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const IsMobile = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    IsMobile();
  }, []);

  return (
    <>
      <IconButton onClick={handleOpen} edge="start" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <div className={Style.navbarTitle}>
        <Logo />
        {!isMobile && (
          <>
            <div className={Style.horizontalSpacer}></div>
            <Typography
              color={"textPrimary"}
              variant="h6"
              className={Style.title}
            >
              DJDCodE
            </Typography>
          </>
        )}
      </div>
      <Drawer anchor={"left"} open={open} onClose={handleClose}>
        <div className={Style.sideMenu}>
          <SideMenu handleClick={updatePage} />
        </div>
      </Drawer>
    </>
  );
};

export default MobileNavbar;
