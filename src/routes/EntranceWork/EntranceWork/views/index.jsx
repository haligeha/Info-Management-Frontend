import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class EntranceWorkRoute extends Component{
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
          path="/entrance/work"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/entrance/work/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/entrance/work/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Deviwwce" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/entrance/work/detail/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Gis" */
              './Detail/index'),
            loading: Loading
          })}
        />
        
      </Switch>
    );
  }

}


export default EntranceWorkRoute;

