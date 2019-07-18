import React, { Component, } from 'react';
import { PageTitle } from '../../../components';
import { Link } from "react-router-dom";
import { Tabs } from 'antd';
import Material from './Material';
import Equipment from './Equipment';
import RescueTeam from './RescueTeam';
import Shelter from "./Shelter";

const TabPane = Tabs.TabPane;

class Resource extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    return (
      <div className="resource-list-page">
        <Tabs ActiveKey="1">
          <TabPane tab={<Link to="/emergency/resource/material">应急救援物资</Link>}
            key="1"
          >
            <Material />
          </TabPane>
          <TabPane 
            tab={<Link to="/emergency/resource/equipment">应急救援装备</Link>}
            key="2"
          > 
            <Equipment />   
          </TabPane>
          <TabPane 
            tab={<Link to="/emergency/resource/team">应急救援队伍</Link>}
            key="3"
          >
            <RescueTeam />
          </TabPane>
          <TabPane 
            tab={<Link to="/emergency/resource/shelter">应急避难场所</Link>}
            key="4"
          >
            <Shelter />
            
          </TabPane>
        </Tabs>
      </div>

    );
  }
}

export default Resource;

