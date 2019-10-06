import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import NewSpot from "./pages/NewSpot";
import Profile from "./pages/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/newspot" component={NewSpot} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
