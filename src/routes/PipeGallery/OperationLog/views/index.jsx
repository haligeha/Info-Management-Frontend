import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class LogRoute extends Component{
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
          path="/pipe/log"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeLog" */
              './Index/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/pipe/log/detail"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeLogDetail" */
              './Detail/index'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default LogRoute;