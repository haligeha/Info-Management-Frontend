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

class RouteView extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          //path="/monitor/view"
          path="/"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "DataDisplay" */
              './Monitor/DataDisplay'),
            loading: Loading
          })}
        />
        {/* <Route    
          path="/"
          component={Loadable({
            loader: () => import(
              './Home'),
            loading: Loading
          })}exact
        />  */}
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
          path="/monitor/video"
          component={Loadable({
            loader: () => import(
              './Monitor/Video'),
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
          path="/inspection/employee"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/Employee'),
            loading: Loading
          })}
        />
        <Route
          path="/inspection/calendar"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/DailyInspection'),
            loading: Loading
          })}
        />
        <Route
          path="/inspection/pathway"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "Indicator" */
              './Inspection/PathWay'),
            loading: Loading
          })}
        />
        <Route
          path="/inspection/entrance/work"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './EntranceWork/EntranceWork'),
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
          path="/emergency/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PlanApproval" */
              './Emergency/PlanApproval'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterial" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/material/new"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterialNew" */
              './Emergency/Resource/Material/views/Create/index'),
            loading: Loading
          })}
        />
        <Route
          exact
          path="/emergency/resource/material/edit/:id"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceMaterialEdit" */
              './Emergency/Resource/Material/views/Create/index'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/equipment"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceEquipment" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/team"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceTeam" */
              './Emergency/Resource'),
            loading: Loading
          })}
        />
        <Route
          path="/emergency/resource/shelter"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "ResourceShelter" */
              './Emergency/Resource'),
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
          path="/entrance/approval"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "EntranceWork" */
              './EntranceWork/WorkApproval/views'),
            loading: Loading
          })}
        />
        <Route
          path="/pipe/area"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeGallery" */
              './PipeGallery/Area'),
            loading: Loading
          })}
        />
        <Route
          path="/pipe/management"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeGallery" */
              './PipeGallery/Management'),
            loading: Loading
          })}
        />
        <Route
          path="/pipe/log"
          component={Loadable({
            loader: () => import(
              /* webpackChunkName: "PipeLog" */
              './PipeGallery/OperationLog'),
            loading: Loading
          })}
        />
      </Switch>
    );
  }

}


export default withRouter(RouteView);



