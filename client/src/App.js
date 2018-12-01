import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header.js";
import CompareCountries from "./components/CompareCountries";
import CompareYears from "./components/CompareYears";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={CompareCountries} />
          <Route path="/compare-years" component={CompareYears} />
        </Switch>
      </div>
    );
  }
}

export default App;
