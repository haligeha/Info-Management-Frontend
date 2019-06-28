import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../components';
import { Button,Icon,Dropdown,Menu } from 'antd';
import {BMAP_DRAWING_POLYGON,BMAP_DRAWING_RECTANGLE,BMAP_DRAWING_CIRCLE,} from '../../../common/BMAP_DATA'
var overlaycomplete=function(e){
  overlays.push(e.overlay);
  label.push(e.label);
  console.log(e);
};
var overlays=[];
var idArray=[];
var logArray=[];
var lohArray=[];
var nameArray=[];
var adds=[];
window.adds=adds
var openIfoID;
var markers=[];
var overlays=[];
window.overlays=overlays;
var label=[];
var markerClusterer
var drawPoint=[]
var drawPoint1=[]
var polylinePoint=[]

var polylinePointSum=[]
var pipeIdArray=[];
var pipeNameArray=[];
var pipeColorArray=[];
var pipeWidthArray=[];
var pipeTypeArray=[];
var pipeDataArray=[];

var trackpolylinePointSum=[]
var trackdrawPoint=[]
var trackpipeIdArray=[];
var trackpipeNameArray=[];
var trackpipeColorArray=[];
var trackpipeWidthArray=[];
var trackpipeTypeArray=[];
var trackpipeDataArray=[];
var idSign

var sitesID
var idOffset;//用于查找下一页
var textOffset;//用于查找下一页
var hasNext;//判断是否存在下一页
var preDeviceId = [];//用于查找上一页
var preDeviceName = [];//用于查找上一页
var pageNum = 1;//记录当前页面

var polylinePointSum3=[]
var carMk1;
var tidArray=[]
window.overlays=overlays;
class Gis extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
 
  }
  componentDidMount(){
    
    var BMap = window.BMap//取出window中的BMap对象
    var BMapLib=window.BMapLib
    var map = new BMap.Map("allmap",{enableMapClick:false});    
    window.map = map
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

      //实例化鼠标绘制工具
      var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });
     window.drawingManager=drawingManager
    var styleOptions = {
      strokeColor:"red",    //边线颜色。
      fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
      strokeWeight: 3,       //边线的宽度，以像素为单位。
      strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
      fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
      strokeStyle: 'solid' //边线的样式，solid或dashed。
  }

  }
  measure()
  {
      var BMapLib = window.BMapLib//取出window中的BMap对象
      var myDis = new BMapLib.DistanceTool(window.map);
      myDis.open();
  }

  rectangleAreaMeasure()
  {
    console.log(overlaycomplete)
      var drawingManager=window.drawingManager;
      
      drawingManager.open()
      drawingManager.enableCalculate()
      //添加鼠标绘制工具监听事件，用于获取绘制结果

       drawingManager.addEventListener('overlaycomplete', overlaycomplete);
       drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
  }

  areaMeasure()
    {
       var drawingManager=window.drawingManager;
        drawingManager.open()
        drawingManager.enableCalculate()
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        drawingManager.setDrawingMode(BMAP_DRAWING_POLYGON);
    }

    circleAreaMeasure()
    {
        var drawingManager=window.drawingManager;
        drawingManager.open()
        drawingManager.enableCalculate()
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
    }

    clearAll()
    {
        //biaozhi=1;
        var drawingManager=window.drawingManager;
        drawingManager.close();
        console.log(overlays)
        for(var i = 0; i < overlays.length; i++){
            window.map.removeOverlay(overlays[i]);
            window.map.removeOverlay(label[i]);
        }
        overlays.length = 0
        label.length=0;
    }
    addSite()
    {
      var getPoint=function (e)
      {
        console.log(e.point.lng)
      }
        window.map.setDefaultCursor("crosshair");
        window.map.addEventListener("click",getPoint);

    }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.rectangleAreaMeasure}>
          矩形测量
        </Menu.Item>
        <Menu.Item key="2" onClick={this. circleAreaMeasure}>
          圆形测量
        </Menu.Item>
        <Menu.Item key="3" onClick={this.areaMeasure}>
          多边形测量
        </Menu.Item>
        <Menu.Item key="4" onClick={this.clearAll}>
          清除结果
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <PageTitle titles={['监测预警','GIS地图']} />
        <Module>
          <Dropdown overlay={menu}>
            <Button type="primary"
             style={{marginRight:'8px'}}
             >面积测量
            </Button>
          </Dropdown>
          <Button type="primary"
            style={{marginRight:'8px'}}
            onClick={this.measure}
          >距离测距</Button>
          <Button type="primary"
            style={{marginRight:'8px'}}
            onClick={this.addSite}
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
          {/* <Button type="primary"
            style={{marginRight:'8px'}}
          >巡检功能</Button> */}
        </Module>
        <div id="allmap"
         style={{
          width:'100%',
          height:'70vh'
        }} ></div>
      </div>

    );
  }
}

export default Gis;

