import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class EmergencyRoute extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
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
          path="/emergency/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlan" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/plan/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanNew" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/plan/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/plan/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EmergencyPlanDetail" */
              './Detail/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default EmergencyRoute;
