import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "modules/home/containers/HomeContainer";

export default function ModulesRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeContainer} />
      </Switch>
    </Router>
  );
}
