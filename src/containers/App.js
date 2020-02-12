/* eslint-disable import/no-named-as-default */
import Panel from "./Panel";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

class App extends React.Component {
  render() {
    return (
      <Panel/>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
