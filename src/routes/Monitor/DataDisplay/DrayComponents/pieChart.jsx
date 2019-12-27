import React, { Component, } from 'react';
import { Icon } from 'antd';
//导入饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import './index.styl';

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  getOption = () => {
    let option = {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        textStyle: {
          color: '#fff'
        },
        orient: 'vertical',
        x: 'left',
        data:['设备','巡检','管廊','CO','CH4','O2','H2S','温度','湿度','入侵']
      },
      series: [
          {
              name:'故障详情',
              type:'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
  
              label: {
                  normal: {
                      position: 'inner'
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  {value:335, name:'设备',itemStyle: {color: '#6BE6C1'}},
                  {value:679, name:'巡检',itemStyle: {color: '#a5e7f0'}},
                  {value:1548, name:'管廊',itemStyle: {color: '#3FB1E3'}}
              ]
          },
          {
              name:'故障详情',
              type:'pie',
              radius: ['40%', '55%'],
              label: {
                  normal: {
                      formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 16,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },
              data:[
                  {value:335, name:'CO',itemStyle: {color: '#a5e7f0'}},
                  {value:310, name:'CH4',itemStyle: {color: '#F7C5A0'}},
                  {value:234, name:'O2',itemStyle: {color: '#fcce10'}},
                  {value:135, name:'H2S',itemStyle: {color: '#B5C334'}},
                  {value:848, name:'温度',itemStyle: {color: '#EDAFDA'}},
                  {value:251, name:'湿度',itemStyle: {color: '#4ea397'}},
                  {value:147, name:'入侵',itemStyle: {color: '#f6efa6'}},
                  // {value:102, name:'集水井水位',itemStyle: {color: '#1790cf'}}
              ]
          }
      ]
  };
    return option
  }

  render() {
    return (
      <div className="border-line">
        <p><Icon style={{ color: 'red' }} type="issues-close" /> 故障统计</p>       
          <ReactEcharts style={{height : '260px'}} option={this.getOption()} />       
      </div>
    );
  }
}
export default PieChart

