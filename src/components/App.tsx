import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { HomeState } from "./context/homeContext/HomeState";
import { GlobalStyle } from "./styles/GlobalStyle";
import Header from "./elements/Header";
import Home from "./Home";
import Movie from "./Movie";
import NotFound from "./NotFound";

const App = () => (
  <BrowserRouter>
    <Header />
    <HomeState>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:movieId" component={Movie} />
        <Route path="*" component={NotFound} />
      </Switch>
    </HomeState>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
