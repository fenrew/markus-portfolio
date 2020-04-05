import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MainPage from "./components/main-page/MainPage"
const Application = () => {
  return (
    <BrowserRouter>
      <div>
          <Switch>
              <Route exact path="/" render={() => <MainPage />}/>
          </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Application;
