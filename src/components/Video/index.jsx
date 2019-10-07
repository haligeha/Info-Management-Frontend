
import React from 'react';
// import {
//   Player,
//   ControlBar,
//   ReplayControl,
//   ForwardControl,
//   CurrentTimeDisplay,
//   TimeDivider,
//   PlaybackRateMenuButton,
//   VolumeMenuButton
// } from 'video-react';
// import '../../../node_modules/video-react/dist/video-react.css';
import videojs from "video.js";
import videozhCN from "video.js/dist/lang/zh-CN.json";
import "video.js/dist/video-js.css";
import "videojs-flash";

class Video extends React.Component{
  constructor(props){
    super(props);
    this.state={
      

    }
  }
  
  componentDidMount(){
    this.player = videojs(this.videoNode,this.props,function onPlayerReady(){
      console.log('onPlayerReady',this)
    });
    videojs.addLanguage('zh-CN',videozhCN);

  }
  
  componentWillUnmount() {
    if(this.player){
      this.player.dispose()
    }
  }
  render(){
    return (
    // <Player>
    //   {/* <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" /> */}
    //   <source src="rtmp://www.anbotcloud.cn:1936/live/19WV420011/front" />

      //   <ControlBar>
      //     <ReplayControl seconds={10} order={1.1} />
      //     <ForwardControl seconds={30} order={1.2} />
      //     <CurrentTimeDisplay order={4.1} />
      //     <TimeDivider order={4.2} />
      //     <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
      //     <VolumeMenuButton disabled />
      //   </ControlBar>
      // </Player>
    <div>
        <div data-vjs-player>
          <video ref={node => this.videoNode = node} className="video-js"></video>
        </div>
      </div>
    );
  }
}

export default Video;