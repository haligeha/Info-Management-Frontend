import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Button } from 'antd';

class EntranceWorkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div className="entrance-work-detail-page">
        <PageTitle titles={['巡检维护','入廊作业','详情']} />
        
      </div>

    );
  }
}

export default EntranceWorkDetail;

