import React, { Component, } from 'react';
import { Button } from 'antd';
import './index.styl';

class EmptyReportCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() { }

  render() {
    return (
      <div className="report-card-empty" >
        <img src={[require('@src/img/report.png')]} alt="暂无巡检报告" width="380" height="400" />
      </div>

    );
  }
}
export default EmptyReportCard

