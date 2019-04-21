import React, { Component, } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';
const Loading = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

class RouteView extends Component{
  componentDidMount(){

  }
  render(){
    return (
      <Switch>
        <Route    
          path="/monitor/view"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              '../views'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/device"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Marketing" */
              './Device'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/gis"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Marketing" */
              './Gis'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default RouteView;



