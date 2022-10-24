import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import {
  CursoMaker,
  Home,
  Cursos,
  MaterialApoio,
  Login,
  SignUp,
  ForgotPass,
  ResetPass,
} from "../../views";

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/cursomaker" component={CursoMaker} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/cursos" component={Cursos} />
      <Route exact path="/materialapoio" component={MaterialApoio} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/cadastro" component={SignUp} />
      <Route exact path="/recover" component={ForgotPass} />
      <Route exact path="/reset-pass/:token" component={ResetPass} />
      <Redirect from="/" to="/home" />
    </Switch>
  );
}

export default withRouter(Routes);
