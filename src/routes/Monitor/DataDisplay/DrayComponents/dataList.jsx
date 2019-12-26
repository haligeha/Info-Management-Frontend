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
        <p><Icon type="bars" /> 管廊列表</p>
        <div className="data-list">
          <p>名称 安装位置  状态</p>
          {data && data.map(item =>
            (<p>dd{item.name}</p>),
          )}
        </div>
      </div>

    );
  }
}
export default DataList

