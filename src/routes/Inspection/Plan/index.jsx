import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../components';


class InspectionPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {

    return (
      <div>
        <PageTitle titles={['巡检维护','巡检计划']} />
        <Module>
          <p>巡检计划</p>
        </Module>
      </div>

    );
  }
}

export default InspectionPlan;

