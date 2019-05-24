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
  
  render(){
    return (
      <Switch>
        <Route    
          path="/monitor/view"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Scene" */
              './Monitor/Scene'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/device"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Monitor/Device'),
            loading: Loading
          })}
        />
        <Route
          path="/monitor/gis"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
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
          path="/emergency/plan"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Plan" */
              './Emergency/Plan'),
            loading: Loading
          })}
        />
        <Route    
          path="/emergency/resource/material"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Resource" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route    
          path="/emergency/resource/equipment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Resource" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route    
          path="/emergency/resource/team"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Resource" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route    
          path="/emergency/resource/shelter"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Resource" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/PlanApproval'),
            loading: Loading
          })}
        />

        <Route
          path="/emergency/approval/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/PlanApproval'),
            loading: Loading
          })}
        />

        <Route    
          path="/entrance/work"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './EntranceWork/EntranceWork'),
            loading: Loading
          })}
        />
        <Route
          path="/entrance/work/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './EntranceWork/EntranceWork'),
            loading: Loading
          })}
        />

      </Switch>
    );
  }

}


export default RouteView;



