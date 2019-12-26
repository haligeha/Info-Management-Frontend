import React, { Component, } from 'react';
import { Icon } from 'antd';
import './index.styl';

class VideoDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() { }

  render() {
    return (
      <div className="border-line">
        <p><Icon type="laptop" /> 视频监控</p>
      </div>

    );
  }
}
export default VideoDisplay

