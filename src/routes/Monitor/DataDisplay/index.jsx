import React, { Component, } from 'react'
import { BarChart, DataList, PieChart, VideoDisplay, HeaderInfo } from './DrayComponents'
import axios from 'axios';
import './index.styl';

class DataDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerInfoData: [],
      pollingData: [],
      timer: null,
      headerTimer: null,
    };
  }
  // 获取headerinfo从.json文件中
  componentDidMount() {
    axios.get(`http://localhost:3000/getPipeInfo`)
      .then((res) => {
        if (res && res.status === 200) {
          this.setState({
            headerInfoData: res.data.data,
          })
          this.setPollingHeader(res.data.data)
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
          this.setPollingTime(res.data.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentWillUnmount(){
    if(this.state.timer !== null){
      clearInterval(this.state.timer)
    }
    if(this.state.headerTimer !== null){
      clearInterval(this.state.headerTimer)
    }
  }
  setPollingTime = (data) => {
    this.state.timer = setInterval(()=>{
      let len = data.length
      if(len > 5) {
        let item = data.shift()
        data.push(item)
      }
      this.setState({
        pollingData: data
      })
    },1000)
  }
  setPollingHeader = (data) => {
    this.state.headerTimer = setInterval(()=>{
      let len = data.length
      if(len > 6) {
        let item = data.shift()
        data.push(item)
      }
      this.setState({
        headerInfoData: data
      })
    },1000)
  }

  render() {
    const { headerInfoData } = this.state
    const spliceData = headerInfoData.slice(0,6)
    return (
      <div className="data-display">
        <HeaderInfo data={spliceData} />
        <div className="data-display-content">
          <PieChart />
          <BarChart />
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

