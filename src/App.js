import React, { Component, } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { HashRouter } from 'react-router-dom';
import Layouts from './layouts';
import { Provider } from 'react-redux'
import reducer from "./modules/index";
import thunk from 'redux-thunk'; // redux-thunk中间件
import './App.styl';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
// export const { Provider, Consumer } = React.createContext("默认名称");

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Layouts />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
