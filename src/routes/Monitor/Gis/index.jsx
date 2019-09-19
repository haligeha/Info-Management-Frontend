import React, { Component, } from 'react';
import { PageTitle,Module } from '../../../components';
import { Button,Dropdown,Menu,Select,Modal,Radio } from 'antd';
import {BMAP_DRAWING_POLYGON,BMAP_DRAWING_RECTANGLE,BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYLINE} from '../../../common/BMAP_DATA'
// import './JS/DrawingManager.js'
//import LineForm from './createForm/createLine'
import InspectionForm from './createForm/createInspec'

var overlaycomplete=function(e){
  overlays.push(e.overlay);
  label.push(e.label);
  console.log(e);
};
var overlays=[];
//var idArray=[];
//var logArray=[];
//var lohArray=[];
//var nameArray=[];
var adds=[];
window.adds=adds
//var openIfoID;
//var markers=[];
window.overlays=overlays;
var label=[];
//var markerClusterer
//var drawPoint=[]
//var drawPoint1=[]
//var polylinePoint=[]

// var polylinePointSum=[]
// var pipeIdArray=[];
// var pipeNameArray=[];
// var pipeColorArray=[];
// var pipeWidthArray=[];
// var pipeTypeArray=[];
// var pipeDataArray=[];

// var trackpolylinePointSum=[]
// var trackdrawPoint=[]
// var trackpipeIdArray=[];
// var trackpipeNameArray=[];
// var trackpipeColorArray=[];
// var trackpipeWidthArray=[];
// var trackpipeTypeArray=[];
// var trackpipeDataArray=[];
// var idSign

// var sitesID
// var idOffset;//用于查找下一页
// var textOffset;//用于查找下一页
// var hasNext;//判断是否存在下一页
// var preDeviceId = [];//用于查找上一页
// var preDeviceName = [];//用于查找上一页
// var pageNum = 1;//记录当前页面

// var polylinePointSum3=[]
// var carMk1;
// var tidArray=[]
window.overlays=overlays;
class Gis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draw:'1',
      employee:false,
      visible:false,
      formValue:{},
    };
    //子组件触发模态框的关闭
    //this.updateParent= this.updateParent.bind(this);
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



    ///xiajia
  
    //   $.ajax({
    //     url: '/api/v1/map/pipeAll',
    //     type: 'get',
    //     async : false,
    //     dataType: 'json',
    //     contentType: 'application/json;',

    //     error:function(){
    //         Message.error({message: '获取管廊失败'});
    //     },
    //     success: function(req) {
    //         console.log(req)
    //         for (var i = 0; i < req.length; i++) {
    //             pipeIdArray.push(req[i].id);
    //             pipeNameArray.push(req[i].name);
    //             pipeColorArray.push(req[i].pipecolor);
    //             pipeWidthArray.push(req[i].pipewidth);
    //             pipeTypeArray.push(req[i].pipetype);
    //             pipeDataArray.push(vm.timestamp(req[i].createdat));
    //             //console.log($.parseJSON(req.pipes[i].drawpoint).point)
    //             //console.log(req[i].drawpoint.point)
    //             polylinePointSum.push(req[i].drawpoint.point);
    //     }
    //     //console.log(polylinePointSum)
    //     pipeShow(1,polylinePointSum,pipeIdArray,pipeNameArray,pipeColorArray,pipeWidthArray,pipeTypeArray,pipeDataArray);

    //     }
    //    });

    // $.ajax({
    //     url: '/api/v1/map/patroltrackAll',
    //     type: 'get',
    //     async : false,
    //     dataType: 'json',
    //     contentType: 'application/json;',

    //     error:function(){
    //         Message.error({message: '获取巡检线路失败'});
    //     },
    //     success: function(req) {
    //         console.log(req)
    //         for (var i = 0; i < req.length; i++) {
    //             trackpipeIdArray.push(req[i].id);
    //             trackpipeNameArray.push(req[i].name);
    //             trackpipeColorArray.push(req[i].pipecolor);
    //             trackpipeWidthArray.push(req[i].pipewidth);
    //             trackpipeTypeArray.push(req[i].pipetype);
    //             trackpipeDataArray.push(vm.timestamp(req[i].createdat));
    //             //console.log($.parseJSON(req.pipes[i].drawPoint).point)
    //             trackpolylinePointSum.push(req[i].drawpoint.point);
    //     }
    //     //console.log(trackpolylinePointSum)
    //     pipeShow(2,trackpolylinePointSum,trackpipeIdArray,trackpipeNameArray,trackpipeColorArray,trackpipeWidthArray,trackpipeTypeArray,trackpipeDataArray);

    //     }
    //    });
    // // }



    // function pipeShow(type,polylinePointSum,pipeIdArray,pipeNameArray,pipeColorArray,pipeWidthArray,pipeTypeArray,pipeDataArray)
    // {
    //     switch(type)
    //     {
    //     case 1:
    //         for(var i=0;i<polylinePointSum.length;i++)
    //         {
    //             drawPoint=[]
    //             for(var j=0;j<polylinePointSum[i].length;j++)
    //             {
    //                 polylinePoint=new BMap.Point(polylinePointSum[i][j].lng,polylinePointSum[i][j].lat)
    //                 //console.log(polylinePoint)
    //                 drawPoint.push(polylinePoint)
    //                 //console.log(drawPoint)
    //             }
    //             //console.log(drawPoint)
    //             function openInfo(content,e){
    //                 var p = e.target;
    //                  console.log(e.target)
    //                 var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    //                 var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
    //                 map.openInfoWindow(infoWindow,point); //开启信息窗口
    //             }

    //             function addClickHandler(content,marker){
    //                 marker.addEventListener("click",function(e){
    //                     openInfo(content,e)
    //                     openIfoID=marker;
    //                     });
    //             }

    //             var opts = {
    //                 width : 150,     // 信息窗口宽度
    //                 height: 50,     // 信息窗口高度
    //                 enableAutoPan:true,
    //                 enableMessage:true//设置允许信息窗发送短息
    //             };
    //             var content =
    //                         '<div >'+
    //                         ' <table>'+
    //                         ' <tr>'+
    //                         ' <td>'+'用户id:'+'</td>'+
    //                         '<td>'+tenantId+
    //                         '</td>'+
    //                         '</tr>'+
    //                         ' <tr>'+
    //                         ' <td>'+'管廊名称:'+'</td>'+
    //                         '<td>'+pipeNameArray[i]+
    //                         '</td>'+
    //                         '</tr>'+
    //                         '<tr>'+
    //                         '<td>'+'创建时间:'+'</td>'+
    //                         '<td>'+pipeDataArray[i]+
    //                         '</tr>'+
    //                         '</table> '
    //             //起点
    //             var myIcon = new BMap.Icon("../static/baidu/img/us_mk_icon.png", new BMap.Size(23, 20), {
    //                                     anchor: new BMap.Size(5, 20), // 指定定位位置
    //                                     imageOffset: new BMap.Size(0, -45) // 设置图片偏移
    //                                 });
    //             var marker = new BMap.Marker(drawPoint[0],{icon:myIcon}); // 创建点
    //             map.addOverlay(marker);
    //             var label = new BMap.Label(pipeNameArray[i],{offset:new BMap.Size(20,-10)});
    //             marker.setLabel(label);
    //             addClickHandler(content,marker);
    //             //终点
    //             var myIcon = new BMap.Icon("../static/baidu/img/us_mk_icon.png", new BMap.Size(21, 21), {
    //                                     anchor: new BMap.Size(5, 20), // 指定定位位置
    //                                     imageOffset: new BMap.Size(-46, -45) // 设置图片偏移
    //                                 });
    //             var marker = new BMap.Marker(drawPoint[drawPoint.length-1],{icon:myIcon}); // 创建点
    //             map.addOverlay(marker);

    //             var styleOptions = {
    //                         strokeColor:pipeColorArray[i],    //边线颜色。
    //                         fillColor:"",      //填充颜色。当参数为空时，圆形将没有填充效果。
    //                         strokeWeight: pipeWidthArray[i],       //边线的宽度，以像素为单位。
    //                         strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
    //                         fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    //                         strokeStyle: pipeTypeArray[i] //边线的样式，solid或dashed。
    //                     }

    //             //////////////////////////////删除站点//////////////////////////////
    //             function removePolyline(e,ee,polyline){
    //                 MessageBox.confirm('确认删除管廊?', '提示', {
    //                   confirmButtonText: '确定',
    //                   cancelButtonText: '取消',
    //                   type: 'warning'
    //                 }).then(() => {
    //                     for(i=0;i<polylinePointSum.length;i++)
    //                     {
    //                         if(JSON.stringify(polylinePointSum[i]) == JSON.stringify(polyline.getPath()))
    //                         {
    //                             idSign=pipeIdArray[i]
    //                         }
    //                     }
    //                     console.log('http://10.112.17.185:8101/api/v1/map/pipe?pipeId='+idSign)
    //                     $.ajax({
    //                         url: '/api/v1/map/pipe?pipeId='+idSign,
    //                         type: 'delete',
    //                         //dataType: 'json',
    //                         //contentType: 'application/json;',
    //                         error:function(error){
    //                             console.log(error)
    //                             toastr.error('删除失败');
    //                         },
    //                         success: function(req) {
    //                             //toastr.warning('修改完成')
    //                             window.location.reload();
    //                         }
    //                     });
    //                 }).catch(() => {
    //                   Message({message: '已取消删除'});
    //                 });
    //                 // var mymessage=confirm("确认删除站点？");
    //                 // if(mymessage==true)
    //                 // {

    //                 // }
    //                 // else if(mymessage==false)
    //                 // {

    //                 // }
    //             }
    //             function alterPolyline(e,ee,polyline){
    //                 polyline.enableEditing()
    //                 for(i=0;i<polylinePointSum.length;i++)
    //                 {
    //                     if(JSON.stringify(polylinePointSum[i]) == JSON.stringify(polyline.getPath()))
    //                     {
    //                         idSign=pipeIdArray[i]
    //                     }
    //                 }
    //                 //console.log(idSign)
    //             }
    //             function savePolyline(e,ee,polyline){
    //                 polyline.disableEditing()
    //                    $.ajax({
    //                         url: '/api/v1/map/pipe?pipeId='+idSign,
    //                         type: 'get',
    //                         async : false,
    //                         dataType: 'json',
    //                         contentType: 'application/json;',

    //                         error:function(){
    //                             Message.error({message: '失败'});
    //                         },
    //                         success: function(req) {
    //                             console.log(req)
    //                             var draw={point:polyline.getPath()}
    //                             var draw1=JSON.stringify(draw)
    //                             console.log(draw1)
    //                             console.log(JSON.stringify({id:req.id,name:req.name,tenantid:req.tenantid,pipecolor:req.pipecolor,pipewidth:req.pipewidth,pipetype:req.pipetype,drawpoint:draw1,createdat:req.createdat}))
    //                             $.ajax({
    //                                 url:'/api/v1/map/pipe',
    //                                 data:JSON.stringify({id:req.id,name:req.name,tenantid:req.tenantid,pipecolor:req.pipecolor,pipewidth:req.pipewidth,pipetype:req.pipetype,drawpoint:draw1,createdat:req.createdat}),
    //                                 type:'put',//提交方式
    //                                 //dataType: 'json',
    //                                 contentType: "application/json",

    //                                 success: function(req){
    //                                    console.log(req)
    //                                    window.location.reload();
    //                                 },
    //                                 error:function(error)
    //                                 {
    //                                     console.log(error)
    //                                     Message.error({message: '错误'});
    //                                 }
    //                             });
    //                         }
    //                        });

    //             }
    //             //console.log(drawPoint)
    //             var polyline = new BMap.Polyline(drawPoint,styleOptions);
    //             map.addOverlay(polyline);   //增加折线
    //             //addPolylineClickHandler(polyline)
    //             var polylineMenu=new BMap.ContextMenu();
    //             polylineMenu.addItem(new BMap.MenuItem('删除',removePolyline.bind(polyline)));
    //             polylineMenu.addItem(new BMap.MenuItem('修改',alterPolyline.bind(polyline)));
    //             polylineMenu.addItem(new BMap.MenuItem('保存',savePolyline.bind(polyline)));
    //             polyline.addContextMenu(polylineMenu);

    //         }
    //     break;
    //     case 2:
    //         for(i=0;i<polylinePointSum.length;i++)
    //         {
    //             drawPoint=[]
    //             for(j=0;j<polylinePointSum[i].length;j++)
    //             {
    //                 polylinePoint=new BMap.Point(polylinePointSum[i][j].lng,polylinePointSum[i][j].lat)
    //                 //console.log(polylinePoint)
    //                 drawPoint.push(polylinePoint)
    //             }

    //             function openInfo(content,e){
    //                 var p = e.target;
    //                  console.log(e.target)
    //                 var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    //                 var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
    //                 map.openInfoWindow(infoWindow,point); //开启信息窗口
    //             }

    //             function addClickHandler(content,marker){
    //                 marker.addEventListener("click",function(e){
    //                     openInfo(content,e)
    //                     openIfoID=marker;
    //                     });
    //             }

    //             var opts = {
    //                 width : 225,     // 信息窗口宽度
    //                 height: 50,     // 信息窗口高度
    //                 enableAutoPan:true,
    //                 enableMessage:true//设置允许信息窗发送短息
    //             };
    //             var content =
    //                         '<div >'+
    //                         ' <table>'+
    //                         ' <tr>'+
    //                         ' <td>'+'用户id:'+'</td>'+
    //                         '<td>'+tenantId+
    //                         '</td>'+
    //                         '</tr>'+
    //                         ' <tr>'+
    //                         ' <td>'+'巡检线路名称:'+'</td>'+
    //                         '<td>'+pipeNameArray[i]+
    //                         '</td>'+
    //                         '</tr>'+
    //                         '<tr>'+
    //                         '<td>'+'创建时间:'+'</td>'+
    //                         '<td>'+pipeDataArray[i]+'</td>'+
    //                         '</tr>'+
    //                         '</table> '
    //             var myIcon = new BMap.Icon("../static/baidu/img/us_mk_icon.png", new BMap.Size(23, 20), {
    //                                     anchor: new BMap.Size(5, 20), // 指定定位位置
    //                                     imageOffset: new BMap.Size(0, 0) // 设置图片偏移
    //                                 });
    //             var marker = new BMap.Marker(drawPoint[0],{icon:myIcon}); // 创建点
    //             map.addOverlay(marker);
    //             var label = new BMap.Label(pipeNameArray[i],{offset:new BMap.Size(20,-10)});
    //             marker.setLabel(label);
    //             addClickHandler(content,marker);

    //             var myIcon = new BMap.Icon("../static/baidu/img/us_mk_icon.png", new BMap.Size(21, 21), {
    //                                     anchor: new BMap.Size(5, 20), // 指定定位位置
    //                                     imageOffset: new BMap.Size(-46, 0) // 设置图片偏移
    //                                 });
    //             var marker = new BMap.Marker(drawPoint[drawPoint.length-1],{icon:myIcon}); // 创建点
    //             map.addOverlay(marker);

    //             //////////////////////////////删除巡检线路//////////////////////////////
    //             function removeTrackPolyline(e,ee,polyline){
    //                 MessageBox.confirm('确认删除巡检线路?', '提示', {
    //                   confirmButtonText: '确定',
    //                   cancelButtonText: '取消',
    //                   type: 'warning'
    //                 }).then(() => {
    //                     for(i=0;i<polylinePointSum.length;i++)
    //                     {
    //                         if(JSON.stringify(polylinePointSum[i]) == JSON.stringify(polyline.getPath()))
    //                         {
    //                             idSign=pipeIdArray[i]
    //                         }
    //                     }
    //                     $.ajax({
    //                         url: '/api/v1/map/patroltrack/?trackId='+idSign,
    //                         type: 'delete',
    //                         error:function(){
    //                             Message.error({message: '删除失败'});
    //                         },
    //                         success: function(req) {
    //                             //toastr.warning('修改完成')
    //                             window.location.reload();
    //                         }
    //                     });

    //                 }).catch(() => {
    //                   Message({message: '已取消删除'});
    //                 });
    //                 // var mymessage=confirm("确认删除站点？");
    //                 // if(mymessage==true)
    //                 // {

    //                 // }
    //                 // else if(mymessage==false)
    //                 // {

    //                 // }
    //             }
    //             function alterTrackPolyline(e,ee,polyline){
    //                 polyline.enableEditing()
    //                 for(i=0;i<polylinePointSum.length;i++)
    //                 {
    //                     if(JSON.stringify(polylinePointSum[i]) == JSON.stringify(polyline.getPath()))
    //                     {
    //                         idSign=pipeIdArray[i]
    //                     }
    //                 }
    //             }
    //             function saveTrackPolyline(e,ee,polyline){
    //                 polyline.disableEditing()
    //                  $.ajax({
    //                         url: '/api/v1/map/patroltrack?trackId='+idSign,
    //                         type: 'get',
    //                         async : false,
    //                         dataType: 'json',
    //                         contentType: 'application/json;',

    //                         error:function(){
    //                             Message.error({message: '保存失败'});
    //                         },
    //                         success: function(req) {
    //                             console.log(req)
    //                             var draw={point:polyline.getPath()}
    //                             var draw1=JSON.stringify(draw)
    //                             console.log(draw1)
    //                             console.log(JSON.stringify({id:req.id,name:req.name,tenantid:req.tenantid,pipecolor:req.pipecolor,pipewidth:req.pipewidth,pipetype:req.pipetype,drawpoint:draw1,createdat:req.createdat}))
    //                             $.ajax({
    //                                 url:'/api/v1/map/patroltrack',
    //                                 data:JSON.stringify({id:req.id,name:req.name,tenantid:req.tenantid,pipecolor:req.pipecolor,pipewidth:req.pipewidth,pipetype:req.pipetype,drawpoint:draw1,createdat:req.createdat}),
    //                                 type:'put',//提交方式
    //                                 //dataType: 'json',
    //                                 contentType: "application/json",

    //                                 success: function(req){
    //                                    console.log(req)
    //                                    window.location.reload();
    //                                 },
    //                                 error:function(error)
    //                                 {
    //                                     console.log(error)
    //                                     Message.error({message: '保存错误'});
    //                                 }
    //                             });
    //                         }
    //                        });

    //             }
    //             var styleOptions = {
    //                         strokeColor:pipeColorArray[i],    //边线颜色。
    //                         fillColor:"",      //填充颜色。当参数为空时，圆形将没有填充效果。
    //                         strokeWeight: pipeWidthArray[i],       //边线的宽度，以像素为单位。
    //                         strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
    //                         fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
    //                         //icons:[icons],
    //                         strokeStyle: pipeTypeArray[i] //边线的样式，solid或dashed。
    //             }

    //             var polyline = new BMap.Polyline(drawPoint,styleOptions);
    //             map.addOverlay(polyline);   //增加折线
    //             //addPolylineClickHandler(polyline)
    //             var polylineMenu=new BMap.ContextMenu();
    //             polylineMenu.addItem(new BMap.MenuItem('删除',removeTrackPolyline.bind(polyline)));
    //             polylineMenu.addItem(new BMap.MenuItem('修改',alterTrackPolyline.bind(polyline)));
    //             polylineMenu.addItem(new BMap.MenuItem('保存',saveTrackPolyline.bind(polyline)));
    //             polyline.addContextMenu(polylineMenu);

    //         }
    //     break;

    //     }


    // }





  }
  //子组件关闭模态框
  closeModal=()=>{
    this.setState({
      visible:false
    })
    console.log(this.state.visible)
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
    
  drawPipe()
  {
    var drawingManager=window.drawingManager;
    //  window.drawPara=this.state.form
    drawingManager.open()
    drawingManager.enableCalculate()
    //添加鼠标绘制工具监听事件，用于获取绘制结果
    drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    drawingManager.setDrawingMode(BMAP_DRAWING_POLYLINE);

  }
    //获取绘制模态框中的radio选择
    modalChange=e=>{
      this.setState({
        draw: e.target.value,
      });

      const draw=this.state.draw
    
    }
    
    //获取表单内容
    //根据radio选择，返回组件
    formChoose(){
      // if(this.state.draw==="1"){
      //   return(
      //     <LineForm wrappedComponentRef={this.saveFormRef}/>
      //   )
      // }
      if(this.state.draw==="1"){
        return(
          <InspectionForm wrappedComponentRef={this.saveFormRef}/>
        )
      }
    }

    //绘制模态框显示
    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    //绘制模态框叉叉隐藏
   handleCancel=()=>{
     this.setState({
       visible: false,
     });
   }
  
   //显示巡检模态框
   showInspection=()=>{
     this.setState({
       employee: true,
     });
   }

   //取消后巡检模态框隐藏
   handleCancelInspection=()=>{
     this.setState({
       employee: false,
     });
   }

   //确定后巡检模态框隐藏
   handleOkInspection=()=>{
     this.setState({
       employee: false,
     });
   }
   
   //绘制模态框隐藏
   handleOk=()=>{
     this.setState({
       visible: false,
     });
     this.drawPipe();
   }

   //获得表单数据，并且打印出来
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.handleOk();
      window.drawPara=values
      console.log(values)
      console.log('Received values of form: ', values);
      form.resetFields();
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

   //跳转
   jump=()=>{
     return(
       <a href="http://39.104.189.84:8800/baidu?id=2" target="_blank"/>
     )
   }
   render() {
     const {draw}=this.state
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

         <Modal
           title="绘制功能"
           visible={this.state.visible}
           onOk={this.handleCreate}
           onCancel={this.handleCancel}
         >
           <Radio.Group onChange={this.modalChange} value={draw}>
             {/* <Radio value="1">绘制管廊</Radio> */}
             <Radio value="1">绘制巡检路线</Radio>
           </Radio.Group>   
           {this.formChoose()}
         </Modal>

         <Modal
           title="添加巡检人员"
           visible={this.state.employee}
           onOk={this.handleOkInspection}
           onCancel={this.handleCancelInspection}
         >巡检人员：
           <Select defaultValue="jack" style={{ width: 120 }} onChange={this.inspectionChange}>
             <Select.Option value="jack">Jack</Select.Option>
             <Select.Option value="lucy">Lucy</Select.Option>     
           </Select>
         </Modal>

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
           {/* <Button type="primary"
             style={{marginRight:'8px'}}
             onClick={this.addSite}
           >添加标注</Button> */}
           {/* <Button type="primary"
             style={{marginRight:'8px'}}
           >框选搜索</Button> */}
           {/* <Button type="primary"
             style={{marginRight:'8px'}}
           >查看报警事件</Button> */}
           <Button type="primary"
             style={{marginRight:'8px'}}
             onClick={this.showModal}
           >绘制功能</Button>
           <Button type="primary"
             style={{marginRight:'8px'}}
             onClick={this.showInspection}
           >巡检功能</Button>
           {/* <Button type="primary"
             style={{marginRight:'8px'}}
           ><a href="http://39.104.189.84:8800/baidu?id=2" target="_blank">进入场景</a></Button> */}
         </Module>
         <div id="allmap"
           style={{
             width:'100%',
             height:'70vh'
           }}
         ></div>
       </div>

     );
   }
}

export default Gis;

