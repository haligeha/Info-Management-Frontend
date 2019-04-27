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
              './Monitor/Scene'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/device"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Marketing" */
              './Monitor/Device'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/gis"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Marketing" */
              './Monitor/Gis'),
            loading: Loading
          })}
        />

        
        <Route    
          path="/inspection/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/Plan'),
            loading: Loading
          })}
        />
        <Route
          path="/inspection/entrance/work"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Inspection/EntranceWork'),
            loading: Loading
          })}
        />

        <Route
          path="/emergency/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Marketing" */
              './Emergency/Plan'),
            loading: Loading
          })}
        />
        <Route    
          path="/emergency/resource"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/plan/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Marketing" */
              './Emergency/PlanApproval'),
            loading: Loading
          })}
        />
        
      </Switch>
    );
  }

}


export default RouteView;



