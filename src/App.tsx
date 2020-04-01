import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Timer } from "./Timer";
import { Setup } from "./Setup";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Setup />
        </Route>
        <Route exact path="/timer/:duration">
          <Timer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
