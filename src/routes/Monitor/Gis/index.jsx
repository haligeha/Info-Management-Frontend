import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../components';
import { Button } from 'antd';

class Gis extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }



  render() {

    return (
      <div>
        <PageTitle titles={['监测预警','GIS地图']} />
        <Module>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >面积测量</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >距离测距</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >添加标注</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >框选搜索</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >查看报警事件</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >绘制功能</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
          >巡检功能</Button>
        </Module>
        
      </div>

    );
  }
}

export default Gis;

