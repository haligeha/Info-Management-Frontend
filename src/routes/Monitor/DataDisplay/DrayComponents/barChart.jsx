import React, { Component, } from 'react';
import { Icon } from 'antd';
import ReactEcharts from 'echarts-for-react'
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';

import './index.styl';

class CombChart extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getOption = () => {
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        textStyle: {
          color: '#fff'
        },
        data: ['CO', 'CH4', 'O2', 'H2S', '温度', '湿度', '集水井水位', '入侵', '设备故障']
      },
      textStyle: {
        color: '#fff'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [        
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }       
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'CO',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'CH4',
          type: 'bar',
          stack: '广告',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'O2',
          type: 'bar',
          stack: '广告',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'H2S',
          type: 'bar',
          stack: '广告',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '温度',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{ type: 'min' }, { type: 'max' }]
            ]
          }
        },
        {
          name: '湿度',
          type: 'bar',
          barWidth: 5,
          stack: '搜索引擎',
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: '集水井水位',
          type: 'bar',
          stack: '搜索引擎',
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: '入侵',
          type: 'bar',
          stack: '搜索引擎',
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: '设备故障',
          type: 'bar',
          stack: '搜索引擎',
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    }
    return option
  }
  render() {

    return (
      <div className="border-line">
        <p><Icon style={{ color: 'yellow' }} type="alert" /> 报警预测</p>        
          <ReactEcharts style={{height : '250px'}} option={this.getOption()} />
      </div>

    );
  }
}
export default CombChart

