import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../../components';
import { Button } from 'antd';

class EntranceWorkNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div>
        <PageTitle titles={['巡检维护','入廊作业','新建']} />
        
      </div>

    );
  }
}

export default EntranceWorkNew;

