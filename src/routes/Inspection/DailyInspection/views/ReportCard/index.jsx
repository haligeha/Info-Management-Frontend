import React, { Component, } from 'react';
import { Button } from 'antd';
import './index.styl';

class ReportCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() { }

  render() {
    return (
      <div className="report-card">
        <div className="report-card-header">
          <p>2017/12/22 巡检报告</p>
          <Button>打印</Button>
        </div>
        <div className="report-card-content">

        </div>
        <div className="report-card-content">

        </div>
        <div className="report-card-content">

        </div>
      </div>

    );
  }
}

export default ReportCard;

