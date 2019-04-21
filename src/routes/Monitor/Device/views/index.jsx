import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../components';


class EmergencyPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {

    return (
      <div>
        <PageTitle titles={['监测预警','设备信息']} />
        <Module>
          <p>设备欣喜</p>
        </Module>
      </div>

    );
  }
}

export default EmergencyPlan;

