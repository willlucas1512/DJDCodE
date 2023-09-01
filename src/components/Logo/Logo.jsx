import React from "react";
import logo from "./logodjde.png";

import Style from "./Logo.module.scss";

const Logo = (props) => {
  return (
    <div className={Style.root}>
      <img className={Style.logo} src={logo} alt="Logo do DJDE" />
    </div>
  );
};

export default Logo;
