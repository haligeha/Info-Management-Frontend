import React, { Component, } from 'react';
import { HashRouter} from 'react-router-dom';
import Layouts from './layouts';
import './App.styl';
export const {Provider,Consumer} = React.createContext("默认名称");
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
