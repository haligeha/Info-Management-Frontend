import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class EquipmentRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const Loading = () => {
      return (
        <div className="loading">
          <Spin size="large"></Spin>
        </div>
      );
    };
    return (
      <Switch>
        <Route
          exact
          path="/emergency/resource/equipment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyResource" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/equipment/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyResourceNew" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/equipment/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyResourceDetail" */
              './Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/equipment/edit/:id"
          component={Loadable({
            loader: () => import('./Create/index'),
            loading: Loading
          })}
        />

      </Switch>
    );
  }

}


export default EquipmentRoute;

