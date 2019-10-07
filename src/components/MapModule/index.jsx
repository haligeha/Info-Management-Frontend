import React from 'react';

class MapModule extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }
  
  componentDidMount(){
    var BMap = window.BMap;
    var map = new BMap.Map("gismap");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl());	  
    map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
  }
  render(){
    return (
      <div style={{width:'100%',height:'100%'}} id="gismap"></div>
    );
  }
}

export default MapModule;