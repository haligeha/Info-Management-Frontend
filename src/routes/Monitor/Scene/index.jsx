import React, { Component, } from 'react';
import { Button, Form, Row, Col, Input, Icon, } from 'antd';
import { PageTitle,Module } from '../../../components';
import './index.styl';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react';
//import echartTheme from './../themeLight'
import echarts from 'echarts/lib/echarts'
//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
const FormItem = Form.Item;



class SceneView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
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
  componentWillMount(){
    //主题的设置要在willmounted中设置
    //echarts.registerTheme('Imooc',echartTheme);
  }
  getOption1 =()=> {
    let option = {
      title: {
        text: '管廊用电情况'
      },
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        y:'25px',
        data:['德胜','艮山','大江东','沿江大道','金桥北路']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['一月','二月','三月','四月','五月','六月','七月']
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          name:'德胜',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'艮山',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'大江东',
          type:'line',
          stack: '总量',
          areaStyle: {},
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'沿江大道',
          type:'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'金桥北路',
          type:'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  
    return option
  }
  getOption2=()=>{
    let option = {
      title:{
        text:'管廊告警统计'
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        y:'20px',
        data: ['CO', 'CH4','O2','H2S','温度','湿度','集水井水位','入侵','设备故障']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '2%',
        containLabel: true
      },
      xAxis:  {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['一月','二月','三月','四月','五月','六月','七月']
      },
      series: [
        {
          name: 'CO',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [32, 30, 30, 33, 22, 28, 32]
        },
        {
          name: 'CH4',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [12, 13, 10, 13, 9, 23, 21]
        },
        {
          name: 'O2',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [22, 18, 19, 23, 29, 33, 31]
        },
        {
          name: 'H2S',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [10, 12, 21, 14, 10, 15, 10]
        },
        {
          name: '温度',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [20, 32, 8, 9, 12, 33, 20]
        },
        {
          name: '湿度',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [8, 8, 9, 9, 12, 13, 13]
        },
        {
          name: '集水井水位',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [8, 8, 9, 9, 12, 13, 13]
        },
        {
          name: '入侵',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [8, 8, 9, 9, 12, 13, 13]
        },
        {
          name: '设备故障',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [8, 8, 1, 3, 9, 3, 13]
        }
      ]
    };
    return option;
  }
  getOption3=()=>{
    let option = {
      title: {
        text: '管廊实时数据'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      legend: {
        y:'20px',
        data:['环境温度', '设备检测峰值']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function (){
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
              now = new Date(now - 2000);
            }
            return res;
          })()
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function (){
            var res = [];
            var len = 10;
            while (len--) {
              res.push(10 - len - 1);
            }
            return res;
          })()
        }
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '环境温度',
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: 'value',
          scale: true,
          name: '设备检测峰值',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name:'环境温度',
          type:'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data:(function (){
            var res = [];
            var len = 10;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })()
        },
        {
          name:'设备检测峰值',
          type:'line',
          data:(function (){
            var res = [];
            var len = 0;
            while (len < 10) {
              res.push((Math.random()*10 + 5).toFixed(1) - 0);
              len++;
            }
            return res;
          })()
        }
      ]
    };
  
    return option;
  
  }
  render() {
    const FORM_ITEM_SPAN = 11;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const {
      form,  
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <PageTitle titles={['监测预警','首屏展示']} />
        {/* <Module>
          <Row type="flex"
            justify="start"
          >
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="场景名称"
                {...formItemLayout}
              >
                {getFieldDecorator('name')(
                  <Input placeholder="请输入场景名称" />,
                )}
              
              </FormItem>
            </Col>
            <Col>
            （ 场景名称显示8个字以内 ）
            </Col>
          </Row>
          <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="选择布局"
                {...formItemLayout}
              >
                <Col span="4"><Icon type="laptop"
                  style={{ fontSize: 24,}}
                /></Col>
                <Col span="4"><Icon type="appstore-o"
                  style={{ fontSize: 24}}
                /></Col>
                <Col span="4"><Icon type="layout"
                  style={{ fontSize: 24, color: '#08c'}}
                /></Col>
                <Col span="4"><Icon type="exception"
                  style={{ fontSize: 24}}
                /></Col>  
              </FormItem>
            </Col>
            
          </Row>
          <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="关联画面"
                {...formItemLayout}
              >
                <Col span="3"><Button type="primary"
                  size="small">GIS</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small">预案</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small">告警</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small">视频</Button></Col>
                <Col span="3"><Button type="primary"
                  size="small">统计</Button></Col>
                <Col span="9">拖拽或选中区域点击</Col>
              </FormItem>
            </Col>
            
          </Row>
          <Row type="flex"
            justify="center"
          >
            <Col span="19">
              
            </Col>
            
          </Row>
        </Module> */}
        
        <div className="gis-map" 
          id="gismap" 
        >
           
        </div>
        <div className="plan-info">
          <ReactEcharts option={this.getOption1()} theme="Imooc"  style={{height:'240px'}}/>
        </div>
        <div className="alarm-info">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:'240px'}}/>
        </div>
        <div className="charts">
          <ReactEcharts option={this.getOption3()} theme="Immoc" style={{height:'240px'}}/>
        </div>
        <div className="video-1">
          
        </div>
        <div className="video-2">
        video-2
        </div>
        <Player>
          <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
          <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" />

          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton disabled />
          </ControlBar>
        </Player>
      </div>

    );
  }
}

export default Form.create()(SceneView);

