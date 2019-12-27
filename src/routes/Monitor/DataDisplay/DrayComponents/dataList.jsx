import React, { Component, } from 'react';
import { Icon } from 'antd';
import './index.styl';

class DataList extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { data } = this.props
    return (
      <div className="border-line">
        <p><Icon style={{ color: '#87F7CF' }} type="bars" /> 管廊列表</p>
        <div className="data-list">
          <p>
            <b className="data-list-info">名称</b>
            <b className="data-list-info">安装位置</b>
            <b>状态</b>
          </p>
          {data && data.map((item, index) =>
            (
              <p key={index}>
                <span className="data-list-info">{item.name}</span>
                <span className="data-list-info">{item.position}</span>
                <Icon
                  type={item.statusId === 1 ? "exclamation-circle" : "check-circle"}
                  style={{ color: item.statusId === 1 ? "red" : "green" }}
                /> {item.status}
              </p>),
          )
          }
        </div>
      </div >

    );
  }
}
export default DataList

