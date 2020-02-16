import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class EmployeeRoute extends Component {
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
          path="/inspection/employee"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Employee" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/employee/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmployeeNew" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/inspection/employee/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmployeeEdit" */
              './Create/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default EmployeeRoute;