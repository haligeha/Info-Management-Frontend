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
        orient: 'vertical',
        x: 'left',
        data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '百度', '谷歌', '必应']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          color: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab', '#91ca8c', '#f49f42'],
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            normal: {
              position: 'inner'

            }
          },
          labelLine: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          data: [
            { value: 34, name: '96.3% 正常状态', }
          ]
        },
        {
          name: '访问来源',
          type: 'pie',
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
          data: [
            { value: 335, name: '直达' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 1048, name: '百度' },
            { value: 251, name: '谷歌' },
            { value: 147, name: '必应' }

          ]
        }
      ]
    }
    return option
  }

  render() {
    return (
      <div className="border-line">
        <p><Icon style={{ color: 'red' }} type="issues-close" /> 故障统计</p>
        <ReactEcharts option={this.getOption()} />
      </div>

    );
  }
}
export default PieChart

