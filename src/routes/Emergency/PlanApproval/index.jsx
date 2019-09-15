import React, { Component, } from 'react';
//import {Link} from 'react-router-dom';
import { PageTitle } from '../../../components';
import { Tabs } from 'antd';
import NotApproved from './NotApproved';
import Approved from './Approval';
import Results from './Results';
import ApprovalRoute from './route';

const TabPane = Tabs.TabPane;

class PlanApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    
    return (
      
      <div className="plan-approval-list-page">
        
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab="未审批"
            key="1"
          >
            <PageTitle titles={['应急指挥','预案审批','未审批']} />
            
            <ApprovalRoute>
              <NotApproved />
            </ApprovalRoute>
          </TabPane>
          <TabPane tab="已审批"
            key="2"
          > 
            <PageTitle titles={['应急指挥','预案审批','已审批']} />
            <Approved />
          </TabPane>
          <TabPane tab="审批结果"
            key="3"
          >
            <PageTitle titles={['应急指挥','预案审批','审批结果']} />
            <Results />
          </TabPane>
        </Tabs>
        
      </div>
      
    );
  }
}

export default PlanApproval;

