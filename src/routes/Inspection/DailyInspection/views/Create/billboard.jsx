import React, { Component, } from 'react';
import { Button } from 'antd';
import './index.styl';

class Billboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  componentDidMount() { }

  render() {
    return (
      <div className="billboard-style">
        <div>广告牌</div>
      </div>

    );
  }
}
export default Billboard

