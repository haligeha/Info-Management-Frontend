import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class MaterialRoute extends Component {
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
          path="/emergency/resource/material"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterial" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterialNew" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterialDetail" */
              './Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterialEdit" */
              './Create/index'),
            loading: Loading
          })}
        />

      </Switch>
    );
  }

}


export default MaterialRoute;

