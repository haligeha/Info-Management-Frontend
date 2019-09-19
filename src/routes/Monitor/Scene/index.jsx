import React, { Component, } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Row, Col, Icon } from 'antd';
import { PageTitle,Module } from '../../../components';
import './index.styl';
import { Video } from '../../../components';
import { EchartsModule } from '../../../components';
import { MapModule } from '../../../components';
const FormItem = Form.Item;



class SceneView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layoutstate:1,
      rtmpSrc:[
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/front',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/back',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/left',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/right',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/infrared',
      ],
      position:0
    };
  }

  componentDidMount(){
    
  }
  componentWillMount(){
    //主题的设置要在willmounted中设置
    //echarts.registerTheme('Imooc',echartTheme);
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
   
    const videoJsOptions = {
      autoplay: true,  //自动播放
      language: 'zh-CN', 
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      //width: 800,  //宽
      //height: 500,  //高
      fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
      // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // textTrackDisplay: false,  // 不渲染字幕相关DOM
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[0],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    }
    const videoJsOptions1 = {
      autoplay: true,  //自动播放
      language: 'zh-CN', 
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      //width: 800,  //宽
      //height: 500,  //高
      fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
      // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // textTrackDisplay: false,  // 不渲染字幕相关DOM
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[1],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    }
    const videoJsOptions2 = {
      autoplay: true,  //自动播放
      language: 'zh-CN', 
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      //width: 800,  //宽
      //height: 500,  //高
      fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
      // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但还是存在
      // textTrackDisplay: false,  // 不渲染字幕相关DOM
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[2],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    }
    let layout;
    switch(this.state.layoutstate){
    case 1: layout = (
      <div>
        <div className="gis-map-1" >
          <MapModule />
        </div>
        <div className="plan-info-1">
          <EchartsModule choose={1} />
        </div>
        <div className="alarm-info-1">
          <EchartsModule choose={2}/>
        </div>
        <div className="charts-1">
          <EchartsModule choose={3} />
        </div>
        
        <div className="video-1-1">
          <Video {...videoJsOptions}/>
        </div>
        
        <div className="video-1-2">
          <Video {...videoJsOptions1}/> 
        </div>
      </div>)
      break;
    case 2 : layout = (
      <div>
        <div className="wrap-gis-map-2">
          <div className="gis-map-2">
            <MapModule />
          </div>
        </div>
        <div className="video-2-1">
          {this.state.layoutstate&&<Video {...videoJsOptions1}/>}
        </div>
        <div className="video-2-2">
          {this.state.layoutstate&&<Video {...videoJsOptions2}/>}
        </div>
        <br />
        <div className="plan-info-2">
          <EchartsModule choose={1} />
        </div>
        <div className="alarm-info-2">
          <EchartsModule choose={2}/>
        </div>
        <div className="charts-2">
          <EchartsModule choose={3} />
        </div>
      </div>
    )
      break;
    case 3 : layout = (
      <div>
        <div className="wrap-gis-map-3">
          <div className="gis-map-3">
            <MapModule />
          </div>
        </div>
        <div className="video-3-1">
          {this.state.layoutstate&&<Video {...videoJsOptions1}/>}
        </div>
        <div className="video-3-2">
          {this.state.layoutstate&&<Video {...videoJsOptions2}/>}
        </div>
        <div className="wrap-plan-info-3">
          <div className="plan-info-3">
            <EchartsModule choose={1} />
          </div>
        </div>
       
      </div>
    )
      break;
    case 4 : layout = (
      <div>
        <div className="video-4-1">
          {this.state.layoutstate&&<Video {...videoJsOptions}/>}
        </div>
        <div className="video-4-2">
          {this.state.layoutstate&&<Video {...videoJsOptions2}/>}
        </div>
        <div className="video-4-3">
          {this.state.layoutstate&&<Video {...videoJsOptions1}/>}
        </div>
        <div className="gis-map-4">
          <MapModule />
        </div>
      </div>
    )
      break;
    default : layout = (
      <div>
        <div className="gis-map-1" >
          <MapModule />
        </div>
        <div className="plan-info-1">
          <EchartsModule choose={1} />
        </div>
        <div className="alarm-info-1">
          <EchartsModule choose={2}/>
        </div>
        <div className="charts-1">
          <EchartsModule choose={3} />
        </div>
        <div className="video-1-1">
          {this.state.layoutstate&&<Video {...videoJsOptions}/>}
        </div>
        <div className="video-1-2">
          {this.state.layoutstate&&<Video {...videoJsOptions1}/>}
        </div>
      </div>
    )
    
    }
    return (
      <div>
        <PageTitle titles={['监测预警','首屏展示']} />
        <Module>
          <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="选择布局"
                {...formItemLayout}
              >
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:1})}}><Icon type="laptop"
                  style={{ fontSize: 24,}}
                /></Button></Col>
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:2})}}><Icon type="appstore-o"
                  style={{ fontSize: 24}}
                /></Button></Col>
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:3})}}><Icon type="layout"
                  style={{ fontSize: 24}}
                /></Button></Col>
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:4})}}><Icon type="exception"
                  style={{ fontSize: 24}}
                /></Button></Col>  
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
                  size="small"><Link to="/monitor/gis">GIS</Link></Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"><Link to="/emergency/plan">预案</Link></Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"><Link to="/entrance/work">入廊</Link></Button></Col>
                <Col span="3"><Button type="primary"
                  size="small"><Link to="/pipe/management">统计</Link></Button></Col>
              </FormItem>
            </Col>
            
          </Row>
          
        </Module>
        
        <div>{layout}</div>
      </div>

    );
  }
}

export default Form.create()(SceneView);

