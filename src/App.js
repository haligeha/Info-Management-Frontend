import React, { Component, } from 'react';
import { HashRouter, } from 'react-router-dom';
import Layouts from './layouts';
import './App.styl';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Layouts />
      </HashRouter>
    );
  }
}

export default App;
