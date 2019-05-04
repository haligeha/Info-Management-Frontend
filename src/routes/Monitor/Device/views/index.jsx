import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../../components';


class DeviceInfo extends Component {
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
          <p>设备信息</p>
        </Module>
      </div>

    );
  }
}

export default DeviceInfo;

