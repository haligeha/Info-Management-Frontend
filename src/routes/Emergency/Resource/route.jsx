import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class ResourceRoute extends Component{
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
          path="/emergency/resource/material"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Material/views/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Material/views/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './Material/views/Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/edit/:id"
          component={Loadable({
            loader:()=>import('./Material/views/Create/index'),
            loading:Loading})}
        />
        <Route 
          exact   
          path="/emergency/resource/equipment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Equipment/views/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/equipment/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Equipment/views/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/equipment/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './Equipment/views/Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/equipment/edit/:id"
          component={Loadable({
            loader:()=>import('./Equipment/views/Create/index'),
            loading:Loading})}
        />
        <Route 
          exact   
          path="/emergency/resource/team"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './RescueTeam/views/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/team/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './RescueTeam/views/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/team/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './RescueTeam/views/Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/team/edit/:id"
          component={Loadable({
            loader:()=>import('./RescueTeam/views/Create/index'),
            loading:Loading})}
        />
        <Route 
          exact   
          path="/emergency/resource/shelter"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Shelter/views/Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/shelter/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Shelter/views/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/shelter/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './Shelter/views/Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/shelter/edit/:id"
          component={Loadable({
            loader:()=>import('./Shelter/views/Create/index'),
            loading:Loading})}
        />
      </Switch>
    );
  }

}


export default ResourceRoute;

