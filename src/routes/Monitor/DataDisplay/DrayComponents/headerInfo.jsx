import React, { Component, } from 'react';
import { Progress } from 'antd';
import './index.styl';

class HeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderInfo = (data = []) => {
    return data.map(item =>
      (<div className="header-info-box" key={item.id}>
        <span>{item.name}</span>
        <span className="header-info-content">总长：{item.length}km</span>
        <span className="header-info-content">入廊管线：{item.line}</span>
        <span className="header-info-footer">健康装况：</span>
        <Progress strokeColor={item.percent <= 70 ? "red" : "green"} percent={item.percent} />
      </div>),
    )
  }
  render() {
    const { data } = this.props
    return (
      <div className="header-info">
        {this.renderInfo(data)}
      </div>
    );
  }
}
export default HeaderInfo

