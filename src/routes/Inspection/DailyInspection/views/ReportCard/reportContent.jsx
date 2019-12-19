import React, { Component, } from 'react';
import { Button, Icon } from 'antd';
import './index.styl';

class ReportCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() { }

  render() {
    const { cardData } = this.props
    console.log(cardData)
    return (
      <div className="report-card">
        <div className="report-card-header">
          <p>2017/12/22 巡检报告</p>
          <Button className="whiteButton" value="small"><Icon type="printer" />打印</Button>
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
export default ReportCard

