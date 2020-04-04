import { Grommet, Main } from "grommet";
import { dark } from "grommet/themes";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { Setup } from "./Setup";
import { Timer } from "./Timer";

export function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Grommet theme={dark} full>
            <Main align="center" justify="center" pad="medium" fill>
              <Route exact path="/" component={Setup} />
              <Route exact path="/timer" component={Timer} />
            </Main>
          </Grommet>
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
}
