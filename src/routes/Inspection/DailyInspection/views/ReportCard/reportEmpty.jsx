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
      <div className="report-card">
        <img alt="暂无巡检报告" src="" />
      </div>

    );
  }
}
export default EmptyReportCard

