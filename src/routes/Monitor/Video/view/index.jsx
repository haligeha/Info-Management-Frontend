import React,{Component} from "react";
import {PageTitle,Module} from '../../../../components'
import './index.styl';
import {Video} from '../../../../components'
import {Button,Form,Row,Col,Icon} from 'antd';
const FormItem=Form.Item
class Surveillance extends React.Component{
  constructor(props){
    super(props);
    this.state={
      layoutstate:'',
      rtmpSrc:[
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/front',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/back',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/left',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/right',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/infrared'
      ],
    }
  }
  
  render(){
    const FORM_ITEM_SPAN=11;
    const formItemLayout={
      labelCol:{span:6},
      wrapperCol:{span:16}
    }
    const {form}=this.props;
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
    const videoJsOptions3 = {
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
          src: this.state.rtmpSrc[3],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    }
    const videoJsOptions4 = {
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
          src: this.state.rtmpSrc[4],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
          // type: 'video/mp4',
        }
      ]
    }
    let layout;
    switch(this.state.layoutstate){
    case 1:layout=(
      
      <div className="video-1-1">
        <Video {...videoJsOptions} />
      </div>
      
    )
      break;
    case 2:layout=(
      <div>
        <div className="video-2-1">
          {this.state.layoutstate&&<Video {...videoJsOptions} />}
        </div>
        <div className="video-2-2">
          {this.state.layoutstate&&<Video {...videoJsOptions2} />}
        </div>
      </div>
    )
      break;
    case 3:layout=(
      <div>
        <div className="video-3-1">
          <Video {...videoJsOptions}/>
        </div>
        <div className="video-3-2">
          <Video {...videoJsOptions1}/>
        </div>
        <div className="video-3-3">
          <Video {...videoJsOptions2}/>
        </div>
        <div className="video-3-4">
          <Video {...videoJsOptions3}/>
        </div>
      </div>
    )
      break;
    case 4:layout=(
      <div>
        <div className="video-4-1">
          {this.state.layoutstate&&<Video {...videoJsOptions4}/>}
        </div>
        <div className="video-4-2">
          <Video {...videoJsOptions3}/>
        </div>
        <div className="video-4-3">
          <Video {...videoJsOptions2}/>
        </div>
        <div className="video-4-4">
          <Video {...videoJsOptions1}/>
        </div>
        <div className="video-4-5">
          <Video {...videoJsOptions}/>
        </div>
      </div>
    )
      break;
    default: layout=(
      <div className="video-1-1">
        <Video {...videoJsOptions}/>
      </div>
    )
    }
    return (
      <div>
        <PageTitle titles={['监测预警','实时监控']} />
        <Module>
          <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="选择分屏选项"
                {...formItemLayout}
              >
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:1})}}><Icon type="laptop"
                  style={{ fontSize: 24,}}
                /></Button></Col>
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:2})}}><Icon type="appstore-o"
                  style={{ fontSize: 24,}}
                /></Button></Col>
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:3})}}><Icon type="layout"
                  style={{ fontSize: 24,}}
                /></Button></Col>
                <Col span="4"><Button onClick={()=>{this.setState({layoutstate:4})}}><Icon type="exception"
                  style={{ fontSize: 24,}}
                /></Button></Col>
              </FormItem>
            </Col>
          </Row>
          {/* <Row>
            <Col span={FORM_ITEM_SPAN}>
              <FormItem
                label="选择视频源"
                {...formItemLayout}
              >
                <Col span="4">1</Col>
                <Col span="4">1</Col>
                <Col span="4">1</Col>
                <Col span="4">1</Col>
                <Col span="4">1</Col>
              </FormItem>
            </Col>
          </Row> */}
        </Module>
        <div>
          {layout}
        </div>
      </div>
    );

  }
}
export default Surveillance;