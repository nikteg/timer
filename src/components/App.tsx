import { Grommet, Main } from "grommet";
import { dark, ThemeType } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { Setup } from "./Setup";
import { Timer } from "./Timer";

const customTheme: ThemeType = {
  layer: {
    background: "rgba(0, 0, 0, .7)",
  },
};

const theme = deepMerge(dark, customTheme);

export function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Grommet theme={theme} full>
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
