import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class TeamRoute extends Component{
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
          path="/emergency/resource/team"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/team/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/team/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './Detail/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/team/edit/:id"
          component={Loadable({
            loader:()=>import('./Create/index'),
            loading:Loading})}
        />
      </Switch>
    );
  }

}


export default TeamRoute;

