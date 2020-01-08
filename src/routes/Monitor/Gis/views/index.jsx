import React, { Component, } from 'react';
import { PageTitle, } from '@src/components';
import AMap from 'AMap'
import './index.styl'

class GisMap extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() {
    this.initMap()
  }
  initMap = () => {
    var map = new AMap.Map('gisMap', {
      zoom: 11,//级别
      center: [116.397428, 39.90923],//中心点坐标
      viewMode: '3D'//使用3D视图
    });
  }

  render() {
    return (
      <div>
        <PageTitle titles={['智能监测', 'GIS地图']} />
        <div style={{ width: '100%', height: '100vh' }} id="gisMap"></div>
      </div>
    );
  }
}

export default GisMap;