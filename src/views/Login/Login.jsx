import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login(props) {
  const [inUp, setInUp] = useState("in");

  return inUp === "in" ? (
    <SignIn setInUp={setInUp} />
  ) : (
    <SignUp setInUp={setInUp} />
  );
}

export default Login;
