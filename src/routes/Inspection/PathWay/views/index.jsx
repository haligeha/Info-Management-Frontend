import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class PathWayRoute extends Component {
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
          path="/inspection/pathway"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "InspectionPathway" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/pathway/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "InspectionPathwayNew" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/pathway/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "InspectionPathwayEdit" */
              './Create/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default PathWayRoute;