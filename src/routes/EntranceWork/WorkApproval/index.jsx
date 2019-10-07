import React, { Component, } from 'react';
import {Link} from 'react-router-dom';
import { PageTitle } from '../../../components';
import { Tabs } from 'antd';
import NotApproved from './NotApproved/index';
import Approved from './Approval/index';
import Results from './Results/index';
import WorkApprovalRoute from './route';

const TabPane = Tabs.TabPane;

class WorkApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    
    return (
      
      <div className="work-approval-list-page">
        
        <Tabs defaultActiveKey="1">
          <TabPane 
            tab={<Link to="/entrance/approval">未审批</Link>}
            key="1"
          >
            <PageTitle titles={['入廊作业','作业审批','未审批']} />
            <WorkApprovalRoute>
              <NotApproved />
            </WorkApprovalRoute>
          </TabPane>
          <TabPane tab="已审批"
            key="2"
          > 
            <PageTitle titles={['入廊作业','作业审批','已审批']} />
            <Approved />
          </TabPane>
          <TabPane tab="审批结果"
            key="3"
          >
            <PageTitle titles={['入廊作业','作业审批','审批结果']} />
            <Results />
          </TabPane>
        </Tabs>
        
      </div>
      
    );
  }
}

export default WorkApproval;

