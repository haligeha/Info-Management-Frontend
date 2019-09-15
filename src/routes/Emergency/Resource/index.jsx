import React, { Component, } from 'react';
import {Route} from 'react-router-dom';
//import { PageTitle } from '../../../components';
//import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import Material from './Material/views/Index/index';
import Equipment from './Equipment/views/Index/index';
import RescueTeam from './RescueTeam/views/Index/index';
import Shelter from "./Shelter/views/Index/index";
//import ResourceRoute from './route';
//import EquipmentRoute from './route2';
const TabPane = Tabs.TabPane;

class Resource extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tabKey:""
    };
    this.onTabChange=this.onTabChange.bind(this);
  }
  
  onTabChange=(key)=>{

    this.setState({tabKey:key});
    this.props.history.replace({pathname:"/emergency/resource/"+key,state:{tabKey:key}});
    
  }

  render() {
    return (
      <div className="resource-list-page">
        <Tabs
          activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : 'material'}
          onChange={this.onTabChange}
        >
          <TabPane 
            tab="应急救援物资"
            key="material"
          >
            <Route exact 
              path="/emergency/resource/material" 
              component={Material} 
            />
            
          </TabPane>
          <TabPane 
            tab="应急救援装备"
            key="equipment"
          > 
            <Route exact
              path="/emergency/resource/equipment"
              component={Equipment}

            />
          </TabPane>
          <TabPane 
            tab="应急救援队伍"
            key="team"
          >
            <Route exact
              path="/emergency/resource/team"
              component={RescueTeam}

            />
            
          </TabPane>
          <TabPane 
            tab="应急避难场所"
            key="shelter"
          >
            <Route exact
              path="/emergency/resource/shelter"
              component={Shelter}

            />
            
          </TabPane>
        </Tabs>
        
      </div>

    );
  }
}

export default Resource;

