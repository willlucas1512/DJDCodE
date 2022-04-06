import React, { useState, useContext } from "react";
import { IconButton, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Style from "./MobileNavbar.module.scss";
import NavbarContext from "../Navbar/NavbarContext";
import SideMenu from "../SideMenu";

const MobileNavbar = (props) => {
  const { updatePage } = useContext(NavbarContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={Style.root}>
      <IconButton
        onClick={handleOpen}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"left"} open={open} onClose={handleClose}>
        <div className={Style.sideMenu}>
          <SideMenu handleClick={updatePage} />
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNavbar;
