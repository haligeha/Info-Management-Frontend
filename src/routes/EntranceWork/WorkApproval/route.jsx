import React, { Component, } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

class WorkApprovalRoute extends Component{
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
          path="/entrance/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './NotApproved/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/entrance/approval/new/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Device" */
              './NotApproved/Create/index'),
            loading: Loading
          })}
        />
       
      </Switch>
    );
  }

}


export default WorkApprovalRoute;

