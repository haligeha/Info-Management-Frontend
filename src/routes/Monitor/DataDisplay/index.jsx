import React, { Component, } from 'react'
import { CombChart, DataList, PieChart, VideoDisplay, HeaderInfo } from './DrayComponents'
import axios from 'axios';
import './index.styl';

class DataDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerInfoData: [],
      pollingData: []
    };
  }
  // 获取headerinfo从.json文件中
  componentDidMount() {
    axios.get(`http://localhost:3000/getPipeInfo`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({
            headerInfoData: res.data.data,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    axios.get(`http://localhost:3000/getPollingList`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({
            pollingData: res.data.data
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="data-display">
        <HeaderInfo data={this.state.headerInfoData} />
        <div className="data-display-content">
          <PieChart />
          <CombChart />
        </div>
        <div className="data-display-content">
          <DataList data={this.state.pollingData} />
          <VideoDisplay />
        </div>

      </div>

    );
  }
}

export default DataDisplay;

