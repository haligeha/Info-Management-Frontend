import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class PipeRoute extends Component{
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
          path="/pipe/area"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/pipe/area/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/pipe/area/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './Create/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default PipeRoute;