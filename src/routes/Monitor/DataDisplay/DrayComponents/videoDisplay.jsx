import React, { Component, } from 'react';
import { Icon } from 'antd';
import { Video } from '@src/components';
import './index.styl';

class VideoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rtmpSrc: [
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/front',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/back',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/left',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/right',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/infrared',
      ],
    };
  }

  render() {
    const videoJsOptionsFront = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示  
      fluid: false,  //跟随外层容器变化大小，跟随的是外层宽度
      width: 310,
      height: 250,
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[0],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
        }
      ]
    }
    const videoJsOptionsBack = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      fluid: false,  //跟随外层容器变化大小，跟随的是外层宽度
      width: 310,
      height: 250,
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[1],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
        }
      ]
    }
    return (
      <div className="border-line">
        <p><Icon style={{ color: '#D4A4EB' }} type="laptop" /> 视频监控</p>
        <div className="video-display">
          <Video className="video-scene" {...videoJsOptionsFront} />
          <Video className="video-scene" {...videoJsOptionsBack} />
        </div>
      </div>

    );
  }
}
export default VideoDisplay

