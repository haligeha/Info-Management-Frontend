// import React, { Component, } from 'react';
// import { Switch, Route } from 'react-router-dom';
// import { Spin } from 'antd';
// import Loadable from 'react-loadable';

// class ResourceRoute extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const Loading = () => {
//       return (
//         <div className="loading">
//           <Spin size="large"></Spin>
//         </div>
//       );
//     };
//     return (
//       <Switch>
//         <Route
//           exact
//           path="/emergency/resource/material"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceMaterial" */
//               './Material/views/Index/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/material/new"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceMaterialNew" */
//               './Material/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/material/detail/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceMaterialDetail" */
//               './Material/views/Detail/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/material/edit/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceMaterialEdit" */
//               './Material/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/equipment"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceEquipment" */
//               './Equipment/views/Index/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/equipment/new"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceEquipmentNew" */
//               './Equipment/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/equipment/detail/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceEquipmentDetail" */
//               './Equipment/views/Detail/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/equipment/edit/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceEquipmentedit" */
//               './Equipment/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/team"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceTeam" */
//               './RescueTeam/views/Index/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/team/new"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceTeamNew" */
//               './RescueTeam/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/team/detail/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceTeamDetail" */
//               './RescueTeam/views/Detail/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/team/edit/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceTeamEdit" */
//               './RescueTeam/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/shelter"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceShelter" */
//               './Shelter/views/Index/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/shelter/new"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceShelterNew" */
//               './Shelter/views/Create/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/shelter/detail/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceShelterDetail" */
//               './Shelter/views/Detail/index'),
//             loading: Loading
//           })}
//         />
//         <Route
//           exact
//           path="/emergency/resource/shelter/edit/:id"
//           component={Loadable({
//             loader: () => import(
//               /* webpackChunkName: "ResourceShelterEdit" */
//               './Shelter/views/Create/index'),
//             loading: Loading
//           })}
//         />
//       </Switch>
//     );
//   }

// }


// export default ResourceRoute;

