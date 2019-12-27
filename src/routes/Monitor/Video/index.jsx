import React, { Component } from "react";
import { PageTitle, Video, Module } from '@src/components';
import { Button } from "antd";
import './index.styl';

class Surveillance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutstate: 0,
      rtmpSrc: [
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/front',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/back',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/left',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/right',
        'rtmp://www.anbotcloud.cn:1936/live/19WV420011/infrared'
      ],
    }
  }

  render() {
    const videoJsOptionsFront = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      fluid: true,  //跟随外层容器变化大小，跟随的是外层宽度
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
    const videoJsOptionsBack = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      fluid: true,
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
    const videoJsOptionsLeft = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      fluid: true,
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
    const videoJsOptionsRight = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      fluid: true,
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[3],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
        }
      ]
    }
    const videoJsOptionsInfrared = {
      autoplay: true,  //自动播放
      language: 'zh-CN',
      controls: true,  //控制条
      preload: 'auto',  //自动加载
      errorDisplay: true,  //错误展示
      fluid: true,
      userActions: {
        hotkeys: true  //是否支持热键
      },
      sources: [
        {
          src: this.state.rtmpSrc[4],
          type: "rtmp/flv",  //类型可加可不加，目前未看到影响
        }
      ]
    }
    const buttonData = [
      { name: "前置摄像", video: videoJsOptionsFront, status: 0 },
      { name: "左置摄像", video: videoJsOptionsLeft, status: 1 },
      { name: "右置摄像", video: videoJsOptionsRight, status: 2 },
      { name: "后置摄像", video: videoJsOptionsBack, status: 3 },
      { name: "内置摄像", video: videoJsOptionsInfrared, status: 4 }
    ]
    const { layoutstate } = this.state
    return (
      <div className="video-show">
        <PageTitle titles={['智能监测', '视频监控']} />
        <Module>
          <span>主屏显示:</span>
          {buttonData && buttonData.map(item =>
            (<Button
              type="dashed"
              className="video-show-button"
              key={item.status}
              onClick={() => { this.setState({ layoutstate: item.status }) }}
            >
              {item.name}
            </Button>
            ))}
        </Module>
        {layoutstate === 0 &&
          < div className="video-main">
            <div className="video-main-center">
              <Video  {...buttonData[0].video} />
            </div>
            <div className="video-main-left">
              <div className="video-main-margin">
                <Video {...buttonData[1].video} />
              </div>
              <Video {...buttonData[3].video} />
            </div>
            <div className="video-main-right">
              <div className="video-main-margin">
                <Video {...buttonData[2].video} />
              </div>
              <Video {...buttonData[4].video} />
            </div>
          </div>
        }
        {layoutstate === 1 &&
          < div className="video-main">
            <div className="video-main-center">
              <Video {...buttonData[1].video} />
            </div>
            <div className="video-main-left">
              <div className="video-main-margin">
                <Video  {...buttonData[0].video} />
              </div>
              <Video {...buttonData[3].video} />
            </div>
            <div className="video-main-right">
              <div className="video-main-margin">
                <Video {...buttonData[2].video} />
              </div>
              <Video {...buttonData[4].video} />
            </div>
          </div>
        }
        {layoutstate === 2 &&
          < div className="video-main">
            <div className="video-main-center">
              <Video  {...buttonData[2].video} />
            </div>
            <div className="video-main-left">
              <div className="video-main-margin">
                <Video {...buttonData[1].video} />
              </div>
              <Video {...buttonData[3].video} />
            </div>
            <div className="video-main-right">
              <div className="video-main-margin">
                <Video {...buttonData[0].video} />
              </div>
              <Video {...buttonData[4].video} />
            </div>
          </div>
        }
        {layoutstate === 3 &&
          < div className="video-main">
            <div className="video-main-center">
              <Video  {...buttonData[3].video} />
            </div>
            <div className="video-main-left">
              <div className="video-main-margin">
                <Video {...buttonData[1].video} />
              </div>
              <Video {...buttonData[0].video} />
            </div>
            <div className="video-main-right">
              <div className="video-main-margin">
                <Video {...buttonData[2].video} />
              </div>
              <Video {...buttonData[4].video} />
            </div>
          </div>
        }
        {layoutstate === 4 &&
          < div className="video-main">
            <div className="video-main-center">
              <Video  {...buttonData[4].video} />
            </div>
            <div className="video-main-left">
              <div className="video-main-margin">
                <Video {...buttonData[1].video} />
              </div>
              <Video {...buttonData[3].video} />
            </div>
            <div className="video-main-right">
              <div className="video-main-margin">
                <Video {...buttonData[2].video} />
              </div>
              <Video {...buttonData[0].video} />
            </div>
          </div>
        }

      </div>
    );

  }
}
export default Surveillance;